/**
 *
 * Orders
 *
 */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col, Table, Badge, Button } from "reactstrap";
import PaginationDetails from "components/PaginationDetails";
import RtCreatableSelect from "components/RtCreatableSelect";
import { useInjectReducer } from "utils/injectReducer";
import { getIsInvoiceGeneratedBadge } from "utils/componentHelpers";
import { isEmpty } from "lodash";
import { getStoreFilter } from "./helpers";
import reducer from "./reducer";
import history from "../../utils/history";
import { parseDate } from "../../utils/dateTimeHelpers";
import * as operations from "./actions";
import * as selectors from "./selectors";
import "./ordersStyle.scss";

export default function Orders() {
  useInjectReducer({ key: "orders", reducer });
  const dispatch = useDispatch();
  const { orders, paginationDetails, stores } = useSelector((state) => ({
    orders: selectors.orders(state),
    paginationDetails: selectors.paginationDetails(state),
    stores: selectors.stores(state),
  }));
  const [selectedStores, setSelectedStores] = useState([]);

  useEffect(() => {
    dispatch(operations.fetchOrders({ page: 1 }));
    dispatch(operations.fetchStores());
  }, []);

  useEffect(() => {
    dispatch(
      operations.fetchOrders({
        page: 1,
        store: selectedStores
          .map(({ value }) => value)
          .filter((x) => x)
          .join(","),
      })
    );
  }, [selectedStores]);

  const onClick = (id) =>
    history.push({
      pathname: `/order/${id}`,
      state: { id },
    });

  const getOrderData = () =>
    orders.map(
      ({
        _id,
        shopifyDisplayId,
        status,
        shopifyOrderDate,
        storeId: { alias: storeAlias },
        invoiceDetails,
      }) => (
        <React.Fragment key={_id}>
          <tr>
            <td
              className="hover-pointer text-primary"
              onClick={() => onClick(_id)}
            >
              {shopifyDisplayId}
            </td>
            <td>
              <Badge>{status}</Badge>
            </td>
            <td>{parseDate(shopifyOrderDate)}</td>
            <td>
              <Badge>{storeAlias}</Badge>
            </td>
            <td>{getIsInvoiceGeneratedBadge(isEmpty(invoiceDetails))}</td>
          </tr>
        </React.Fragment>
      )
    );

  return (
    <div className="orders mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Orders</title>
        <meta name="description" content="Description of Orders" />
      </Helmet>
      <Row className="mt-4">
        <Col md="3">
          <RtCreatableSelect
            name="description"
            isMulti
            options={getStoreFilter(selectedStores, stores)}
            value={selectedStores}
            onChange={(e) => {
              console.log("E", e);
              if (isEmpty(e) || e == null) {
                setSelectedStores([{ value: undefined, label: "All" }]);
              } else {
                setSelectedStores(e);
              }
            }}
          />
        </Col>
        <div className="align-items-right ml-auto mr-3 mr-md-5">
          <Button
            color="primary"
            className="btn-icon btn-3"
            type="button"
            disabled
            // onClick={() => history.push("/store-form")}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-plus" />
            </span>
            <span className="btn-inner--text">Export Orders</span>
          </Button>
        </div>
      </Row>
      <div className="table-responsive">
        <Table className="mt-3 align-items-center">
          <thead className="thead-light">
            <tr>
              <th scope="col">Shopify Order ID</th>
              <th scope="col">Status</th>
              <th scope="col">Order Date</th>
              <th scope="col">Store</th>
              <th scope="col">Inv. Generated</th>
            </tr>
          </thead>
          <tbody>{getOrderData()}</tbody>
        </Table>
      </div>
      <Row>
        <Col className="text-end ms-auto">
          <PaginationDetails
            paginationDetails={paginationDetails}
            onClick={(page) => {
              dispatch(operations.fetchOrders({ page }));
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

Orders.propTypes = {};
