/**
 *
 * Orders
 *
 */

import React, { useEffect, useState, useMemo } from "react";
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
  Input,
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
import { isEmpty, get, map, filter } from "lodash";
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

  const [shippingDropDown, setShippingDropDown] = useState(false);
  const toggleShippingDropDown = () => setShippingDropDown(!shippingDropDown);

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

  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    dispatch(operations.fetchOrders({ page: 1 }));
    dispatch(operations.fetchStores());
  }, []);

  const nonSelectableRows = useMemo(() => {
    const rowsWithNoInvoice = map(orders, (order, index) => {
      if (isEmpty(get(order, "invoiceDetails", {}))) {
        return order._id;
      }
    });
    const filteredRows = filter(rowsWithNoInvoice, (val) => !_.isNil(val));
    return filteredRows;
  }, [orders]);

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

  const isSelectable = (row) => {
    return !isEmpty(get(row, "invoiceDetails", {}));
  };

  const onSelect = (row) => {
    if (!isSelectable(row)) return false;
    setSelectedOrders((prev) => [...prev, row]);
  };

  const onUnSelect = (row) => {
    setSelectedOrders((prev) => filter(prev, (item) => row._id !== item._id));
  };

  const handleOnSelect = (row, isSelect) => {
    return (isSelect ? onSelect : onUnSelect)(row);
  };

  const selectRowProp = {
    mode: "checkbox",
    clickToSelect: true,
    bgColor: "#f7f8fe",
    onSelect: handleOnSelect,
    hideSelectAll: true,
    nonSelectable: nonSelectableRows,
    nonSelectableClasses: "salesReturnDisabledChecboxTableRow",
    selectionRenderer: ({ mode, checked, disabled }) => {
      return disabled ? null : (
        <Input type="checkbox" checked={checked} className={"m-0"} />
      );
    },
  };

  return (
    <div className="orders mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Orders</title>
        <meta name="description" content="Description of Orders" />
      </Helmet>
      <Row className="mt-4">
        <Col md="2">
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
        <Col md="2">
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
        {/* <Col md="2">
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
        </Col> */}
        <Col md="2">
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
        <Col md="2">
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
            title="Export Orders"
            // onClick={() => history.push("/store-form")}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-file-export" />
            </span>
          </Button>
        </div>
        <div className="align-items-right mr-3 mr-md-5">
          <ButtonDropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            className="mb-2"
            title="Trigger Sync"
          >
            <DropdownToggle color="primary" caret>
              <span className="btn-inner--icon">
                <i className="fas fa-sync" />
              </span>
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
        selectRow={selectRowProp}
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
            formatter: (cell) => cell || "N/A",
          },
          {
            text: "Cust. Phone",
            dataField: "shippingAddress.phone",
            formatter: (cell) => cell || "N/A",
          },
          {
            text: "Payment Mode",
            dataField: "paymentMode",
            formatter: (cell) => getFinancialStatusBadge(cell),
          },
          // {
          //   text: "Fulfillment Status",
          //   dataField: "fulfillmentStatus",
          //   formatter: (cell) => getFulfillmentStatusBadge(cell),
          // },
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
      <Row className="mt-2">
        <Col>
          {!isEmpty(selectedOrders) && (
            // <Button
            //   color="primary"
            //   // onClick={() => generateAreenShippingBills(selectedOrders)}
            //   onClick={() =>
            //     dispatch(operations.generateBeeThereShipment(selectedOrders))
            //   }
            // >
            //   Generate Shipping Bill
            // </Button>
            <ButtonDropdown
              isOpen={shippingDropDown}
              toggle={toggleShippingDropDown}
              className="mb-2"
              title="Generate Shipping Bill"
            >
              <DropdownToggle color="primary" caret>
                Generate Shipping Bill
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  disabled
                  // onClick={() => generateAreenShippingBills(selectedOrders)}
                >
                  Areen Shipping
                </DropdownItem>
                <DropdownItem disabled>BeeThere</DropdownItem>
                <DropdownItem disabled>Elite</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          )}
        </Col>
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
