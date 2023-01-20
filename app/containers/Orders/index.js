/**
 *
 * Orders
 *
 */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col, Table, Badge } from "reactstrap";
import PaginationDetails from "components/PaginationDetails";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import { parseDate } from "../../utils/dateTimeHelpers";
import * as operations from "./actions";
import * as selectors from "./selectors";
import "./ordersStyle.scss";

export default function Orders() {
  useInjectReducer({ key: "orders", reducer });
  const dispatch = useDispatch();
  const { orders, paginationDetails } = useSelector((state) => ({
    orders: selectors.orders(state),
    paginationDetails: selectors.paginationDetails(state),
  }));

  useEffect(() => {
    dispatch(operations.fetchOrders({ page: 1 }));
  }, []);

  const getOrderData = () =>
    orders.map(
      ({
        _id,
        shopifyDisplayId,
        status,
        shopifyOrderDate,
        storeId: { alias: storeAlias },
      }) => (
        <React.Fragment key={_id}>
          <tr>
            <td className="hover-pointer text-primary">{shopifyDisplayId}</td>
            <td>
              <Badge>{status}</Badge>
            </td>
            <td>{parseDate(shopifyOrderDate)}</td>
            <td>
              <Badge>{storeAlias}</Badge>
            </td>
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
      <div className="table-responsive">
        <Table className="mt-3 align-items-center">
          <thead className="thead-light">
            <tr>
              <th scope="col">Shopify Order ID</th>
              <th scope="col">Status</th>
              <th scope="col">Order Date</th>
              <th scope="col">Store</th>
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
