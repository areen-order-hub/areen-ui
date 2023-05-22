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
  Badge,
  ButtonDropdown,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  getPaymentModeBadge,
  getCarrierStatusBadge,
} from "utils/componentHelpers";
import RtInput from "components/RtInput";
import RSelectAsync from "components/RSelectAsync";
import PaginationDetails from "components/PaginationDetails";
import RtCreatableSelect from "components/RtCreatableSelect";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import Table from "components/Table";
import Can from "components/Can";
import {
  ORDER_MODULE,
  CREATE_ACTION,
  UPDATE_ACTION,
} from "../../utils/constants";
import ReactDatetime from "react-datetime";
import ImportOrdersModal from "./ImportOrdersModal";
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
import { useDebounce } from "react-use";
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

  const [showExportModal, setShowExportModal] = useState(false);
  const toggleExportModal = () => setShowExportModal((v) => !v);
  const [ordersForExport, setOrdersForExport] = useState([]);

  const [showImportModal, setShowImportModal] = useState(false);
  const toggleImportModal = () => setShowImportModal((v) => !v);

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

  const [searchText, setSearchText] = useState("");
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
      storeAlias: "",
      storeName: "",
      paymentMode: "",
      shopifyOrderDate: "",
      shopifyOrderName: "",
      shopifyPrice: "",
      itemQuantity: "",
      itemSKU: "",
      itemPrice: "",
      itemTitle: "",
      customerName: "",
      weight: "",
      "billingAddress.name": "",
      "billingAddress.address1": "",
      "billingAddress.address2": "",
      "billingAddress.city": "",
      "billingAddress.province": "",
      "billingAddress.country": "",
      "billingAddress.phone": "",
      "billingAddress.zip": "",
      "shippingAddress.name": "",
      "shippingAddress.address1": "",
      "shippingAddress.address2": "",
      "shippingAddress.city": "",
      "shippingAddress.province": "",
      "shippingAddress.country": "",
      "shippingAddress.phone": "",
      "shippingAddress.zip": "",
      "shippingAddress.latitude": "",
      "shippingAddress.longitude": "",
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

  const shapeAndExportOrders = () => {
    let data = [];
    ordersForExport.forEach(
      ({
        shopifyOrderName,
        invoiceDetails,
        customerName,
        shippingAddress,
        paymentMode,
        carrierService,
        carrierStatus,
        carrierServiceId,
        shopifyOrderDate,
        shopifyPrice,
        weight,
        storeId,
      }) => {
        let row = {
          "Order Id": shopifyOrderName,
          "Invoice No.": get(invoiceDetails, "orderNo", "N/A"),
          "Customer Name": customerName,
          "Customer Phone": get(shippingAddress, "phone", "N/A"),
          "Payment Mode": paymentMode,
          "Carrier Service": carrierService || "N/A",
          "Carrier Status": carrierStatus || "N/A",
          "Carrier Service Id":
            carrierService == "Areen"
              ? get(invoiceDetails, "orderNo")
              : carrierServiceId || "N/A",
          Date: parseDate(shopifyOrderDate, "DD MM YY"),
          "Shopify Price (AED)": shopifyPrice,
          "Inv. Price (AED)":
            `${numberFormatter(get(invoiceDetails, "price"))}` || "N/A",
          "Weight (Gms)": weight,
          Store: get(storeId, "alias", "N/A"),
        };
        data.push(row);
      }
    );

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
      `aoh-exported-orders.xlsx`
    );
    setOrdersForExport([]);
    toggleExportModal();
  };

  const nonSelectableRows = useMemo(() => {
    const rowsWithNoInvoice = map(orders, (order, index) => {
      if (
        isEmpty(get(order, "invoiceDetails", {})) ||
        (order.carrierService &&
          !["Shipment cancelled", "Returned"].includes(
            get(order, "carrierStatus", "")
          ))
      ) {
        return order._id;
      }
    });
    const filteredRows = filter(rowsWithNoInvoice, (val) => !isNil(val));
    return filteredRows;
  }, [orders]);

  const getFilterParams = () => {
    let filter = { page: 1 };
    if (searchText && !isEmpty(searchText)) {
      filter["searchText"] = searchText;
    }

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

  useDebounce(
    () => {
      dispatch(operations.fetchOrders(getFilterParams()));
    },
    1000,
    [searchText]
  );

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
          Generate Shipping Bill{" "}
          {!isEmpty(selectedOrders) &&
            selectedOrders.length > 0 &&
            `(${selectedOrders.length})`}
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
          <DropdownItem onClick={() => onGenerateShipment("Elite")}>
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
          <RtInput
            type="text"
            value={searchText}
            placeholder="Enter Order ID to Search"
            onChange={(e) => setSearchText(e)}
          />
        </Col>
        <Can moduleName={ORDER_MODULE} action={CREATE_ACTION}>
          <div className="align-items-right ml-auto mr-3 mr-md-3">
            <Button
              color="primary"
              className="btn-icon btn-3"
              type="button"
              onClick={() => history.push("/order-form")}
            >
              <span className="btn-inner--icon">
                <i className="fas fa-plus" />
              </span>
              <span className="btn-inner--text">Add Order</span>
            </Button>
          </div>
        </Can>
      </Row>
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
          <Modal
            isOpen={showExportModal}
            toggle={toggleExportModal}
            size="xl"
            fullscreen
            backdrop="static"
          >
            <ModalHeader toggle={toggleExportModal}>Export Orders</ModalHeader>
            <ModalBody>
              <RSelectAsync
                groupClassName="m-0"
                shouldInitialLoad
                controlShouldRenderValue
                placeholder="Select Orders"
                url={`/api/order`}
                isMulti
                name="ordersForExport"
                value={ordersForExport}
                param="shopifyOrderName"
                id="ordersForExport"
                getOptionLabel={(option) => option.shopifyOrderName}
                getOptionValue={(option) => option._id}
                onChange={(e) => {
                  if (e) {
                    setOrdersForExport(e);
                  } else {
                    setOrdersForExport([]);
                  }
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => shapeAndExportOrders()}>
                Export
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setOrdersForExport([]);
                  toggleExportModal();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <ImportOrdersModal
            isOpen={showImportModal}
            toggle={toggleImportModal}
          />
          <Can moduleName={ORDER_MODULE} action={UPDATE_ACTION}>
            {getGenerateShipmentButton()}
          </Can>
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
              <DropdownItem onClick={() => toggleExportModal()}>
                Export Orders
              </DropdownItem>
              <Can moduleName={ORDER_MODULE} action={CREATE_ACTION}>
                <DropdownItem onClick={() => downloadImportTemplate()}>
                  Download Template
                </DropdownItem>
                <DropdownItem onClick={() => toggleImportModal()}>
                  Upload Orders
                </DropdownItem>
              </Can>
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
            sort: true,
            formatter: (cell, { _id, noOfComments }) => (
              <>
                <a
                  href={`/order/${_id}`}
                  className="text-primary hover-pointer"
                  // onClick={() => onClick(_id)}
                  aria-hidden="true"
                >
                  {cell}
                </a>
                {noOfComments != 0 && (
                  <Badge color="info" className="ml-2" title="No Of Comments">
                    {noOfComments}
                  </Badge>
                )}
              </>
            ),
          },
          {
            text: "Inv. No.",
            dataField: "invoiceDetails.orderNo",
            sort: true,
            formatter: (cell) => cell || "N/A",
          },
          {
            text: "Cust. Name",
            dataField: "customerName",
            sort: true,
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
              get(row, "carrierService") == "Areen" ? (
                <span
                  className="text-primary hover-pointer text-underline"
                  title="Download AWB"
                  onClick={() => generateAreenShippingBills([row], () => {})}
                >
                  {get(row, "invoiceDetails.orderNo")}
                </span>
              ) : cell ? (
                <span
                  className="text-primary hover-pointer text-underline"
                  title="Download AWB"
                  onClick={() =>
                    window.open(get(row, "carrierAWBLink", ""), "_blank")
                  }
                >
                  {cell}
                </span>
              ) : (
                "N/A"
              ),
          },
          {
            text: "Date",
            dataField: "shopifyOrderDate",
            sort: true,
            formatter: (cell) => parseDate(cell, "DD MMM YY"),
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
            text: "Weight (Gms)",
            dataField: "weight",
            formatter: (cell) => cell || "N/A",
          },
          {
            text: "Store",
            dataField: "storeId.alias",
            formatter: (cell, { bulkStoreAlias }) =>
              cell || bulkStoreAlias || "N/A",
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
