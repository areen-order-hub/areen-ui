/**
 *
 *
 * DeliveryManagement
 *
 */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { getPaymentModeBadge } from "utils/componentHelpers";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import PaginationDetails from "components/PaginationDetails";
import Table from "components/Table";
import Select from "react-select";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useInjectReducer } from "utils/injectReducer";
import numberFormatter from "utils/numberFormatter";
import { get } from "lodash";
import reducer from "./reducer";
import * as operations from "./actions";
import * as selectors from "./selectors";

import "./deliveryManagementStyle.scss";

export default function DeliveryManagement() {
  useInjectReducer({ key: "deliveryManagement", reducer });
  const dispatch = useDispatch();
  const { orders, paginationDetails } = useSelector((state) => ({
    orders: selectors.orders(state),
    paginationDetails: selectors.paginationDetails(state),
  }));

  const [awb, setAwb] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const toggle = () => setShowModal((v) => !v);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const toggleOrderModal = () => setShowOrderModal((v) => !v);

  const [orderDetails, setOrderDetails] = useState(null);

  const [submitMenuOpen, setSubmitMenuOpen] = useState(false);
  const toggleSubmitMenu = () => setSubmitMenuOpen((v) => !v);

  const [isScanning, setIsScanning] = useState(false);
  const [stopStream, setStopStream] = useState(false);

  const onSubmit = (status) => {
    AlertPopupHandler.open({
      onConfirm: () => {
        setIsScanning(false);
        setAwb("");
        setShowModal(false);
        dispatch(
          operations.onSubmit({
            awb,
            status,
          })
        );
      },
      confirmBtnText: "Yes, Proceed",
      cancelBtnText: "No, Go Back",
      text: (
        <>
          You are about to mark this order as{" "}
          <span className="font-weight-bold font-italic">{status}</span>. Do you
          want to continue?
        </>
      ),
      data: {},
      type: "warning",
      customClass: "text-xs",
      btnSize: "sm",
      confirmBtnBsStyle: "warning",
      cancelBtnBsStyle: "outline-warning",
    });
  };

  useEffect(() => {
    dispatch(
      operations.fetchOrders({
        page: 1,
        carrierStatus: "Out for Delivery",
      })
    );
    return () => setStopStream(true);
  }, []);

  useEffect(() => {
    dispatch(
      operations.fetchOrders({
        page: 1,
        carrierStatus: get(selectedStatus, "value", "Out for Delivery"),
      })
    );
  }, [selectedStatus]);

  return (
    <div className="deliveryManagement mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Delivery Management</title>
        <meta name="description" content="Description of DeliveryManagement" />
      </Helmet>
      <Row className="my-3">
        <Col md={2} xs={6} className="align-items-left mr-auto">
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select Status"
            isClearable={true}
            value={selectedStatus}
            name="status"
            options={["Delivered", "Returned"].map((status) => ({
              value: status,
              label: status,
            }))}
            onChange={(e) => {
              if (e) {
                setSelectedStatus(e);
              } else {
                setSelectedStatus(null);
              }
            }}
          />
        </Col>
        <div className="align-items-right ml-auto mr-3 mr-md-5">
          <Button
            color="primary"
            className="btn-icon btn-3"
            type="button"
            onClick={() => {
              setIsScanning(true);
              setShowModal(true);
            }}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-qrcode" />
            </span>
            <span className="btn-inner--text">Scan AWB</span>
          </Button>
        </div>
      </Row>
      <Table
        bootstrap4
        striped
        search={false}
        bordered={false}
        keyField="_id"
        data={orders}
        columns={[
          {
            text: "View",
            dummyField: true,
            formatter: (cell, row) => (
              <Button
                color="primary"
                size="sm"
                onClick={() => {
                  setOrderDetails(row);
                  setShowOrderModal(true);
                }}
              >
                <span className="btn-inner--icon">
                  <i className="fas fa-eye" />
                </span>
              </Button>
            ),
          },
          {
            text: "AWB",
            dataField: "invoiceDetails.orderNo",
            formatter: (cell) => cell || "N/A",
          },
          {
            text: "Payment Mode",
            dataField: "paymentMode",
            formatter: (cell) => getPaymentModeBadge(cell),
          },
          {
            text: "Amount",
            dataField: "invoiceDetails.price",
            formatter: (cell, { paymentMode }) =>
              paymentMode == "COD" ? `${numberFormatter(cell)}` : "N/A",
          },
          {
            text: "Shipping Address",
            dataField: "shippingAddressString",
            formatter: (cell) => cell || "N/A",
          },
        ]}
      />
      <Row className="mt-2">
        <Col className="text-end ms-auto">
          <PaginationDetails
            paginationDetails={paginationDetails}
            onClick={(page) => {
              dispatch(
                operations.fetchOrders({
                  page,
                  carrierStatus: get(
                    selectedStatus,
                    "value",
                    "Out for Delivery"
                  ),
                })
              );
            }}
          />
        </Col>
      </Row>
      <Modal isOpen={showOrderModal} toggle={toggleOrderModal} backdrop={true}>
        <ModalHeader toggle={toggleOrderModal}>Order Details</ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <h3>{get(orderDetails, "customerName", "N/A")}</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>AWB: {get(orderDetails, "invoiceDetails.orderNo", "N/A")}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Payment Mode: {get(orderDetails, "paymentMode", "N/A")}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                Amount:{" "}
                {get(orderDetails, "paymentMode", "N/A") == "COD"
                  ? `${numberFormatter(
                      get(orderDetails, "invoiceDetails.price")
                    )} AED`
                  : "N/A"}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                Shipping Address: <br />
                {get(orderDetails, "shippingAddressString", "N/A")}
              </p>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <Modal isOpen={showModal} backdrop="static">
        <ModalHeader toggle={toggle}>Scan Code</ModalHeader>
        <ModalBody className="text-center">
          {isScanning ? (
            <BarcodeScannerComponent
              width={250}
              height={250}
              onUpdate={(err, result) => {
                if (result) {
                  setAwb(result.text);
                  setIsScanning(false);
                } else setAwb("");
              }}
              stopStream={stopStream}
            />
          ) : (
            <div>Scanned Successfully!</div>
          )}

          <h2>{awb}</h2>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              setAwb("");
              setIsScanning(true);
            }}
            disabled={!awb}
          >
            Re - Scan
          </Button>
          <ButtonDropdown
            isOpen={submitMenuOpen}
            toggle={toggleSubmitMenu}
            className="mb-2"
            title="Submit"
            disabled={!awb}
          >
            <DropdownToggle color="primary" caret>
              Submit
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => onSubmit("Out for Delivery")}>
                Scan for Pickup
              </DropdownItem>
              <DropdownItem onClick={() => onSubmit("Delivered")}>
                Scan for Delivery
              </DropdownItem>
              <DropdownItem onClick={() => onSubmit("Returned")}>
                Scan for Return
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ModalFooter>
      </Modal>
    </div>
  );
}

DeliveryManagement.propTypes = {};
