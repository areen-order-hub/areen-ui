/**
 *
 * Orders
 *
 */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import {
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  getFinancialStatusBadge,
  getFulfillmentStatusBadge,
} from "utils/componentHelpers";
import PaginationDetails from "components/PaginationDetails";
import RtCreatableSelect from "components/RtCreatableSelect";
import Table from "components/Table";
import ReactDatetime from "react-datetime";
import { useInjectReducer } from "utils/injectReducer";
import moment from "moment-timezone";
import { isEmpty, get, map } from "lodash";
import {
  getStoreFilter,
  getPaymentFilter,
  getFulfillmentFilter,
} from "./helpers";
import reducer from "./reducer";
import history from "../../utils/history";
import { parseDate } from "../../utils/dateTimeHelpers";
import * as operations from "./actions";
import * as selectors from "./selectors";
import "./ordersStyle.scss";

export default function Orders() {
  useInjectReducer({ key: "orders", reducer });
  const dispatch = useDispatch();
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);

  const { orders, paginationDetails, stores } = useSelector((state) => ({
    orders: selectors.orders(state),
    paginationDetails: selectors.paginationDetails(state),
    stores: selectors.stores(state),
  }));
  const [selectedStores, setSelectedStores] = useState([]);
  const [selectedFinStatus, setSelectedFinStatus] = useState([]);
  const [selectedFulStatus, setSelectedFulStatus] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    dispatch(operations.fetchOrders({ page: 1 }));
    dispatch(operations.fetchStores());
  }, []);

  const getFilterParams = () => {
    let filter = { page: 1 };
    if (!isEmpty(selectedStores)) {
      filter["store"] = map(selectedStores, ({ value }) => value)
        .filter((x) => x)
        .join(",");
    }

    if (!isEmpty(selectedFinStatus)) {
      filter["financialStatus"] = map(selectedFinStatus, ({ value }) => value)
        .filter((x) => x)
        .join(",");
    }

    if (!isEmpty(selectedFulStatus)) {
      filter["fulfillmentStatus"] = map(
        selectedFulStatus,
        ({ value }) => value
      ).join(",");
    }

    if (startDate && !isEmpty(startDate)) {
      try {
        filter["startDate"] = moment(startDate)
          .startOf("day")
          .valueOf();
      } catch (err) {
        console.log("Start Date is invalid");
      }
    }

    if (endDate && !isEmpty(endDate)) {
      try {
        filter["endDate"] = moment(endDate)
          .endOf("day")
          .valueOf();
      } catch (err) {
        console.log("End Date is invalid");
      }
    }

    return filter;
  };

  useEffect(() => {
    dispatch(operations.fetchOrders(getFilterParams()));
  }, [
    selectedStores,
    selectedFinStatus,
    selectedFulStatus,
    startDate,
    endDate,
  ]);

  const onClick = (id) =>
    history.push({
      pathname: `/order/${id}`,
      state: { id },
    });

  const getOrderData = () =>
    orders.map(
      ({
        _id,
        shopifyOrderName,
        customerName,
        financialStatus,
        fulfillmentStatus,
        shopifyOrderDate,
        shopifyPrice,
        weight,
        storeId: { alias: storeAlias },
        invoiceDetails,
        shippingAddress,
      }) => (
        <React.Fragment key={_id}>
          <tr>
            <td
              className="hover-pointer text-primary"
              onClick={() => onClick(_id)}
            >
              {shopifyOrderName}
            </td>
            <td>{customerName}</td>
            <td>{get(shippingAddress, "phone", "N/A")}</td>
            <td>{getFinancialStatusBadge(financialStatus)}</td>
            <td>{getFulfillmentStatusBadge(fulfillmentStatus)}</td>
            <td>{parseDate(shopifyOrderDate)}</td>
            <td>{shopifyPrice} AED</td>
            <td>{get(invoiceDetails, "price", "N/A")}</td>
            <td>{weight} KG</td>
            <td>{storeAlias}</td>
            <td>{get(invoiceDetails, "orderNo", "N/A")}</td>
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
            placeholder="Select Stores"
            isValidNewOption={() => false}
            isMulti
            options={getStoreFilter(stores)}
            value={selectedStores}
            onChange={(e) => {
              setSelectedStores(e);
            }}
          />
        </Col>
        <Col>
          <RtCreatableSelect
            name="description"
            placeholder="Payment Status"
            isMulti
            options={getPaymentFilter()}
            value={selectedFinStatus}
            onChange={(e) => {
              setSelectedFinStatus(e);
            }}
          />
        </Col>
        <Col>
          <RtCreatableSelect
            name="description"
            placeholder="Fulfillment Status"
            isMulti
            options={getFulfillmentFilter()}
            value={selectedFulStatus}
            onChange={(e) => {
              setSelectedFulStatus(e);
            }}
          />
        </Col>
        <Col md="1">
          <ReactDatetime
            inputProps={{
              placeholder: "Start Date",
            }}
            dateFormat="DD MMM YYYY"
            timeFormat={false}
            className="text-sm"
            onChange={(e) => {
              try {
                setStartDate(e.format("DD MMM YYYY"));
              } catch (err) {
                setStartDate(null);
              }
            }}
            value={startDate}
          />
        </Col>
        <Col md="1">
          <ReactDatetime
            inputProps={{
              placeholder: "End Date",
            }}
            dateFormat="DD MMM YYYY"
            timeFormat={false}
            className="text-sm"
            onChange={(e) => {
              try {
                setEndDate(e.format("DD MMM YYYY"));
              } catch (err) {
                setEndDate(null);
              }
            }}
            value={endDate}
          />
        </Col>
        <div className="align-items-right ml-auto mr-2">
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
        <div className="align-items-right mr-3 mr-md-5">
          <ButtonDropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            className="mb-2"
          >
            <DropdownToggle color="primary" caret>
              Trigger Sync
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => dispatch(operations.syncOrders())}>
                Sync Orders
              </DropdownItem>
              <DropdownItem onClick={() => dispatch(operations.syncInvoices())}>
                Sync Invoices
              </DropdownItem>
              <DropdownItem onClick={() => dispatch(operations.syncProducts())}>
                Sync Products
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      </Row>
      <Table
        bootstrap4
        striped
        search={false}
        bordered={false}
        keyField="_id"
        data={orders}
        paginationOptions={null}
        columns={[
          {
            text: "Shopify Order ID",
            dataField: "shopifyOrderName",
            formatter: (cell, { _id }) => (
              <span
                className="text-primary hover-pointer"
                onClick={() => onClick(_id)}
                aria-hidden="true"
              >
                {cell}
              </span>
            ),
          },
          {
            text: "Cust. Name",
            dataField: "customerName",
            formatter: (cell) => cell || "-",
          },
          {
            text: "Cust. Name",
            dataField: "shippingAddress.phone",
            formatter: (cell) => cell || "N/A",
          },
          {
            text: "Financial Status",
            dataField: "financialStatus",
            formatter: (cell) => getFinancialStatusBadge(cell),
          },
          {
            text: "Fulfillment Status",
            dataField: "fulfillmentStatus",
            formatter: (cell) => getFulfillmentStatusBadge(cell),
          },
          {
            text: "Date",
            dataField: "shopifyOrderDate",
            sort: true,
            formatter: (cell) => parseDate(cell),
          },
          {
            text: "Shopify Price",
            dataField: "shopifyPrice",
            formatter: (cell) => `${cell} AED`,
          },
          {
            text: "Inv. Price",
            dataField: "invoiceDetails.price",
            formatter: (cell) => cell || "N/A",
          },
          {
            text: "Weight",
            dataField: "weight",
            formatter: (cell) => cell || "N/A",
          },
          {
            text: "Store",
            dataField: "storeId.alias",
            formatter: (cell) => cell || "N/A",
          },
          {
            text: "Inv. No.",
            dataField: "invoiceDetails.orderNo",
            formatter: (cell) => cell || "N/A",
          },
        ]}
      />
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
