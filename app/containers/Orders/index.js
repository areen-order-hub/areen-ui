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
  Spinner,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
} from "reactstrap";
import {
  getPaymentModeBadge,
  getCarrierStatusBadge,
} from "utils/componentHelpers";
import PaginationDetails from "components/PaginationDetails";
import RtCreatableSelect from "components/RtCreatableSelect";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import Table from "components/Table";
import ReactDatetime from "react-datetime";
import { useInjectReducer } from "utils/injectReducer";
import moment from "moment-timezone";
import * as XLSX from "xlsx/xlsx.mjs";
import { isEmpty, get, map, filter, some, isNil } from "lodash";
import {
  getStoreFilter,
  getPaymentFilter,
  getCarrierStatusFiler,
  generateAreenShippingBills,
} from "./helpers";
import reducer from "./reducer";
import numberFormatter from "../../utils/numberFormatter";
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

  const [bulkDropdownOpen, setBulkDropdownOpen] = useState(false);
  const toggleBulkDropdown = () => setBulkDropdownOpen(!bulkDropdownOpen);

  const [currentPage, setCurrentPage] = useState(1);

  const [shippingDropDown, setShippingDropDown] = useState(false);
  const toggleShippingDropDown = () => setShippingDropDown(!shippingDropDown);

  const {
    orders,
    paginationDetails,
    stores,
    isShipmentGenerating,
  } = useSelector((state) => ({
    orders: selectors.orders(state),
    paginationDetails: selectors.paginationDetails(state),
    stores: selectors.stores(state),
    isShipmentGenerating: selectors.isShipmentGenerating(state),
  }));

  const [selectedStores, setSelectedStores] = useState([]);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState([]);
  const [selectedCarrierStatus, setSelectedCarrierStatus] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    dispatch(operations.fetchOrders({ page: 1 }));
    dispatch(operations.fetchStores());
  }, []);

  // Carrier Service
  const generateAreenShipment = (ordersString) => {
    dispatch(
      operations.generateAreenShipment(ordersString, { page: currentPage })
    );
    setSelectedOrders([]);
  };

  const generateBeeThereShipment = (ordersString) => {
    dispatch(
      operations.generateBeeThereShipment(ordersString, { page: currentPage })
    );
    setSelectedOrders([]);
  };

  const generateEliteShipment = (ordersString) => {
    dispatch(
      operations.generateEliteShipment(ordersString, { page: currentPage })
    );
    setSelectedOrders([]);
  };

  // Bulk Import and Export Orders
  const downloadImportTemplate = () => {
    let data = [];
    data.push({
      customerName: "",
      customerPhone: "",
      paymentMode: "",
      shopifyDisplayId: "",
      shopifyOrderDate: "",
      shopifyOrderName: "",
      shopifyPrice: "",
      weight: "",
      "billingAddress.name": "",
      "billingAddress.address1": "",
      "billingAddress.address2": "",
      "billingAddress.city": "",
      "billingAddress.province": "",
      "billingAddress.country": "",
      "billingAddress.phone": "",
      "shippingAddress.name": "",
      "shippingAddress.address1": "",
      "shippingAddress.address2": "",
      "shippingAddress.city": "",
      "shippingAddress.province": "",
      "shippingAddress.country": "",
      "shippingAddress.phone": "",
      "shippingAddress.latitude": "",
      "shippingAddress.longitude": "",
      itemTitle: "",
      itemQuantity: "",
      itemSKU: "",
    });

    var ws = XLSX.utils.json_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }

    saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      `aoh-import-orders-template.xlsx`
    );
  };

  const nonSelectableRows = useMemo(() => {
    const rowsWithNoInvoice = map(orders, (order, index) => {
      if (
        isEmpty(get(order, "invoiceDetails", {})) ||
        (order.carrierService &&
          get(order, "carrierStatus", "") !== "Shipment cancelled")
      ) {
        return order._id;
      }
    });
    const filteredRows = filter(rowsWithNoInvoice, (val) => !isNil(val));
    return filteredRows;
  }, [orders]);

  const getFilterParams = () => {
    let filter = { page: 1 };
    if (!isEmpty(selectedStores)) {
      filter["store"] = map(selectedStores, ({ value }) => value)
        .filter((x) => x)
        .join(",");
    }

    if (!isEmpty(selectedPaymentMode)) {
      filter["paymentMode"] = map(selectedPaymentMode, ({ value }) => value)
        .filter((x) => x)
        .join(",");
    }

    if (!isEmpty(selectedCarrierStatus)) {
      filter["carrierStatus"] = map(selectedCarrierStatus, ({ value }) => value)
        .filter((x) => x)
        .join(",");
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
    selectedPaymentMode,
    selectedCarrierStatus,
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

  const onGenerateShipment = (carrierService) => {
    AlertPopupHandler.open({
      onConfirm: () => {
        switch (carrierService) {
          case "Areen":
            dispatch(operations.setIsShipmentGenerating(true));
            generateAreenShippingBills(selectedOrders, generateAreenShipment);
            break;
          case "BeeThere":
            generateBeeThereShipment(
              map(selectedOrders, (order) => order._id).join(",")
            );
            break;
          case "Elite":
            generateEliteShipment(
              map(selectedOrders, (order) => order._id).join(",")
            );
            break;
        }
      },
      confirmBtnText: "Yes, Proceed",
      cancelBtnText: "No, Go Back",
      text: (
        <>
          You are about to proceed with{" "}
          <span className="font-weight-bold">{carrierService}</span> carrier
          service. This action is irreversible.
        </>
      ),
      data: {},
      type: "success",
      customClass: "text-xs",
      btnSize: "sm",
      confirmBtnBsStyle: "success",
      cancelBtnBsStyle: "outline-success",
    });
  };

  const getGenerateShipmentButton = () => {
    if (isShipmentGenerating)
      return (
        <ButtonDropdown
          isOpen={shippingDropDown}
          toggle={toggleShippingDropDown}
          className="mb-2"
          title="Generate Shipping Bill"
        >
          <DropdownToggle disabled color="primary" caret>
            <span className="btn-inner-icon">
              <Spinner size="sm" className="mr-2" />
            </span>
            <span className="btn-inner-text">Generating</span>
          </DropdownToggle>
        </ButtonDropdown>
      );
    return (
      <ButtonDropdown
        isOpen={shippingDropDown}
        toggle={toggleShippingDropDown}
        className="mb-2"
        title="Generate Shipping Bill"
      >
        <DropdownToggle
          disabled={isEmpty(selectedOrders)}
          color="primary"
          caret
        >
          Generate Shipping Bill
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => onGenerateShipment("Areen")}>
            Areen Shipping
          </DropdownItem>
          <DropdownItem
            disabled
            // disabled={some(selectedOrders, { paymentMode: "COD" })}
            onClick={() => onGenerateShipment("BeeThere")}
          >
            BeeThere
          </DropdownItem>
          <DropdownItem disabled onClick={() => onGenerateShipment("Elite")}>
            Elite
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
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
            placeholder="Payment Mode"
            isMulti
            options={getPaymentFilter()}
            value={selectedPaymentMode}
            onChange={(e) => {
              setSelectedPaymentMode(e);
            }}
          />
        </Col>
        <Col md="2">
          <RtCreatableSelect
            name="description"
            placeholder="Carrier Status"
            isMulti
            options={getCarrierStatusFiler()}
            value={selectedCarrierStatus}
            onChange={(e) => {
              setSelectedCarrierStatus(e);
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
        <div className="d-flex align-items-right ml-auto mr-3">
          {getGenerateShipmentButton()}
          <ButtonDropdown
            isOpen={bulkDropdownOpen}
            toggle={toggleBulkDropdown}
            className="mb-2"
            title="Trigger Sync"
          >
            <DropdownToggle color="primary" caret>
              <span className="btn-inner--icon">
                <i className="fas fa-file-export" />
              </span>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                disabled
                onClick={() => dispatch(operations.syncOrders())}
              >
                Export Orders
              </DropdownItem>
              <DropdownItem onClick={() => downloadImportTemplate()}>
                Download Template
              </DropdownItem>
              <DropdownItem
                disabled
                onClick={() => dispatch(operations.syncProducts())}
              >
                Upload Orders
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          <ButtonDropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            className="mb-2"
            title="Bulk Actions"
          >
            <DropdownToggle color="primary" caret>
              <span className="btn-inner--icon">
                <i className="fas fa-sync" />
              </span>
            </DropdownToggle>
            <DropdownMenu className="mr-4">
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
            text: "Inv. No.",
            dataField: "invoiceDetails.orderNo",
            formatter: (cell) => cell || "N/A",
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
            formatter: (cell) => getPaymentModeBadge(cell),
          },
          {
            text: "Carrier",
            dataField: "carrierService",
            formatter: (cell) => cell || "N/A",
          },
          {
            text: "Carrier Status",
            dataField: "carrierStatus",
            formatter: (cell) => getCarrierStatusBadge(cell),
          },
          {
            text: "Carrier ID",
            dataField: "carrierServiceId",
            formatter: (cell, row) =>
              get(row, "carrierService") == "Areen"
                ? get(row, "invoiceDetails.orderNo")
                : cell || "N/A",
          },
          {
            text: "Date",
            dataField: "shopifyOrderDate",
            sort: true,
            formatter: (cell) => parseDate(cell),
          },
          {
            text: "Shopify Price (AED)",
            dataField: "shopifyPrice",
            formatter: (cell) => cell || "N/A",
          },
          {
            text: "Inv. Price (AED)",
            dataField: "invoiceDetails.price",
            formatter: (cell) => `${numberFormatter(cell)}` || "N/A",
          },
          {
            text: "Weight (Kg)",
            dataField: "weight",
            formatter: (cell) => cell || "N/A",
          },
          {
            text: "Store",
            dataField: "storeId.alias",
            formatter: (cell) => cell || "N/A",
          },
        ]}
      />
      <Row className="mt-2">
        <Col className="text-end ms-auto">
          <PaginationDetails
            paginationDetails={paginationDetails}
            onClick={(page) => {
              setCurrentPage(page);
              dispatch(operations.fetchOrders({ page }));
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

Orders.propTypes = {};
