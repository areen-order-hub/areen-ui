/**
 *
 * OrderDetails
 *
 */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Table,
  Form,
  FormGroup,
  Label,
  Button,
  Spinner,
} from "reactstrap";
import { get, map, isEmpty } from "lodash";
import Skeleton from "react-loading-skeleton";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import classNames from "classnames";
import Can from "components/Can";
import {
  CREATE_ACTION,
  ORDER_MODULE,
  UPDATE_ACTION,
} from "../../utils/constants";
import reducer from "./reducer";
import history from "utils/history";
import RtInput from "../../components/RtInput/index";
import { parseDate } from "utils/dateTimeHelpers";
import * as operations from "./actions";
import * as selectors from "./selectors";
import "./orderDetailsStyle.scss";

export default function OrderDetails({ match }) {
  useInjectReducer({ key: "orderDetails", reducer });
  const dispatch = useDispatch();
  const {
    isLoading,
    shopifyOrderName,
    shopifyOrderDate,
    syncedAt,
    storeDetails,
    billingAddress,
    shippingAddress,
    shopifyOrderItems,
    finalDisplayItems,
    shopifyPrice,
    invoiceDetails,
    carrierService,
    carrierStatus,
    carrierServiceId,
    carrierTrackingLink,
    assignedDeliveryPartner,
    lastScannedTimeStamp,
    weight,
    paymentMode,
    bulkStoreName,
    comments,
    isShipmentCancelling,
  } = useSelector((state) => ({
    shopifyOrderName: selectors.shopifyOrderName(state),
    shopifyOrderDate: selectors.shopifyOrderDate(state),
    syncedAt: selectors.syncedAt(state),
    storeDetails: selectors.storeDetails(state),
    billingAddress: selectors.billingAddress(state),
    shippingAddress: selectors.shippingAddress(state),
    shopifyOrderItems: selectors.shopifyOrderItems(state),
    finalDisplayItems: selectors.finalDisplayItems(state),
    shopifyPrice: selectors.shopifyPrice(state),
    invoiceDetails: selectors.invoiceDetails(state),
    carrierService: selectors.carrierService(state),
    carrierStatus: selectors.carrierStatus(state),
    carrierServiceId: selectors.carrierServiceId(state),
    carrierTrackingLink: selectors.carrierTrackingLink(state),
    assignedDeliveryPartner: selectors.assignedDeliveryPartner(state),
    lastScannedTimeStamp: selectors.lastScannedTimeStamp(state),
    weight: selectors.weight(state),
    paymentMode: selectors.paymentMode(state),
    bulkStoreName: selectors.bulkStoreName(state),
    comments: selectors.comments(state),
    isLoading: selectors.isLoading(state),
    isShipmentCancelling: selectors.isShipmentCancelling(state),
  }));

  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const { id } = match.params;
    if (!id) {
      history.push("/orders");
    } else {
      dispatch(operations.fetchOrder(id));
      dispatch(operations.fetchComments(id));
    }
    return () => dispatch(operations.orderDetailsInit());
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      operations.addComment({
        text: commentText,
        orderId: match.params.id,
      })
    );
    setCommentText("");
  };

  const getOrderLoading = () => {
    return (
      <>
        <Card>
          <CardHeader>
            <Skeleton count={2} />
          </CardHeader>
          <CardBody>
            <Row className="mx-2 mb-3">
              <Col xs="2">
                <Skeleton circle={true} height={50} width={50} />
              </Col>
              <Col xs="4">
                <Skeleton height={11} />
                <Skeleton height={10} />
              </Col>
            </Row>
            <Skeleton count={2} height={15} />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Skeleton width={100} className="mb-4" />
            <Skeleton count={6} className="mb-2" />
          </CardBody>
        </Card>
      </>
    );
  };

  const onCancelShipment = () => {
    AlertPopupHandler.open({
      onConfirm: () => dispatch(operations.deleteShipment(match.params.id)),
      confirmBtnText: "Yes, Cancel",
      cancelBtnText: "No, Go Back",
      text:
        carrierService == "Elite"
          ? `This only marks the shipment as cancelled and doesn't cancel the actual Elite Shipment. Do you want to continue?`
          : `You are about to cancel the shipment. Do you want to continue?`,
      data: {},
      type: "danger",
      customClass: "text-xs",
      btnSize: "sm",
      confirmBtnBsStyle: "danger",
      cancelBtnBsStyle: "outline-danger",
    });
  };

  const onDeleteOrder = () => {
    AlertPopupHandler.open({
      onConfirm: () => dispatch(operations.onDelete(match.params.id)),
      confirmBtnText: "Yes, Delete",
      cancelBtnText: "No, Go Back",
      text: `You are about to delete the order. Do you want to continue?`,
      data: {},
      type: "danger",
      customClass: "text-xs",
      btnSize: "sm",
      confirmBtnBsStyle: "danger",
      cancelBtnBsStyle: "outline-danger",
    });
  };

  const getCancelShipmentButton = () => {
    if (isShipmentCancelling)
      return (
        <Button size="sm" disabled color="danger">
          <span className="btn-inner-icon">
            <Spinner size="sm" className="mr-2" />
          </span>
          <span className="btn-inner-text">Cancelling</span>
        </Button>
      );

    return (
      <Button size="sm" color="danger" onClick={() => onCancelShipment()}>
        Cancel Shipment
      </Button>
    );
  };

  const getOrderComponent = () => {
    return (
      <Card>
        <CardHeader>
          <Row className="px-1 align-items-center">
            <Col xs="12" md="10" className="align-items-center">
              <span className="h1 mr-2 text-primary">{shopifyOrderName}</span>
              <span className="h2 ml-2">
                Invoice #: {get(invoiceDetails, "orderNo", "N/A")}
              </span>
            </Col>
            <Can moduleName={ORDER_MODULE} action={UPDATE_ACTION}>
              {carrierService && carrierStatus != "Shipment cancelled" && (
                <Col className="text-right">{getCancelShipmentButton()}</Col>
              )}
            </Can>
          </Row>
          <Row className="mx-1 mt-3 text-md text-muted">
            <div className="mr-3" title="Shopify Order Date">
              <i className="far fa-calendar-alt mr-1" />
              {shopifyOrderDate}
            </div>
            <div className="mr-3" title="Last Sync At">
              <i className="fas fa-sync mr-1" />
              {syncedAt}
            </div>
            <div
              className={classNames("mr-3", {
                "hover-pointer text-underline":
                  get(storeDetails, "_id", null) &&
                  get(storeDetails, "isShopifyStore", false),
              })}
              title="Store"
              onClick={() =>
                get(storeDetails, "_id", null) &&
                get(storeDetails, "isShopifyStore", false)
                  ? history.push(`/store/${get(storeDetails, "_id", "")}`)
                  : ""
              }
            >
              <i className="far fa-building mr-1" />
              {get(storeDetails, "name", bulkStoreName || "N/A")}
            </div>
          </Row>
        </CardHeader>
        <CardHeader>
          <div className="mb-3">
            <span className="h3 text-muted">Carrier Details</span>
          </div>
          <p>
            <span className="text-muted">Service: </span>
            <span className="text-primary font-weight-bold">
              {carrierService || "N/A"}
            </span>
          </p>
          <p>
            <span className="text-muted">Status: </span>
            <span className="text-primary font-weight-bold">
              {carrierStatus || "N/A"}
            </span>
          </p>
          <p>
            <span className="text-muted">Carrier Id: </span>
            <span className="text-primary font-weight-bold">
              {carrierService == "Areen"
                ? get(invoiceDetails, "orderNo", "N/A")
                : carrierServiceId || "N/A"}
            </span>
          </p>
          {carrierService == "Elite" && (
            <p>
              <span className="text-muted">Carrier Tracking Link: </span>
              <span
                className="text-primary font-weight-bold text-underline hover-pointer"
                onClick={() => {
                  window.open(carrierTrackingLink, "_blank");
                }}
              >
                {carrierTrackingLink || "N/A"}
              </span>
            </p>
          )}
          {carrierService == "Areen" && (
            <>
              <p>
                <span className="text-muted">Delivery Partner Name: </span>
                <span className="text-primary font-weight-bold">
                  {get(assignedDeliveryPartner, "name", "N/A")}
                </span>
              </p>
              <p>
                <span className="text-muted">Delivery Partner Mobile: </span>
                <span className="text-primary font-weight-bold">
                  {get(assignedDeliveryPartner, "phone", "N/A")}
                </span>
              </p>
              <p>
                <span className="text-muted">Last Scanned By Driver: </span>
                <span className="text-primary font-weight-bold">
                  {lastScannedTimeStamp}
                </span>
              </p>
            </>
          )}
        </CardHeader>
        <CardHeader>
          <div className="mb-3">
            <span className="h3 text-muted">Order Details</span>
          </div>
          <p>
            <span className="text-muted">Weight: </span>
            <span className="text-primary font-weight-bold">
              {weight || 0} Gms
            </span>
          </p>
          <p>
            <span className="text-muted">Payment Mode: </span>
            <span className="text-primary font-weight-bold">{paymentMode}</span>
          </p>
          <p>
            <span className="text-muted">Shopify Price: </span>
            <span className="text-primary font-weight-bold">
              {shopifyPrice || "0.00"}
            </span>
          </p>
          <p>
            <span className="text-muted">Invoice Price: </span>
            <span className="text-primary font-weight-bold">
              {get(invoiceDetails, "price", "0.00")}
            </span>
          </p>
          <div className="w-100">
            <div className="table-responsive">
              <Table className="align-items-center responsive">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Item Code</th>
                    <th scope="col">Ordered QTY.</th>
                    <th scope="col">Invoiced QTY.</th>
                    <th scope="col">Website Unit Price</th>
                    <th scope="col">Invoice Unit Price</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(finalDisplayItems).map(([key, value]) => (
                    <tr>
                      <td>{get(value, "title", "-")}</td>
                      <td>{key}</td>
                      <td>{get(value, "quantity", "-")}</td>
                      <td>{get(value, "invoicedQty", "-")}</td>
                      <td>{get(value, "price", "-")}</td>
                      <td>{get(value, "invoicedUnitPrice", "-")}</td>
                      <td>{get(value, "invoicedPrice", "-")}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </CardHeader>
        {bulkStoreName && (
          <Can moduleName={ORDER_MODULE} action={CREATE_ACTION}>
            <CardHeader>
              <div className="mb-3">
                <span className="h3 text-muted">Order Actions</span>
              </div>
              <p>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => onDeleteOrder()}
                >
                  Delete Order
                </Button>
              </p>
            </CardHeader>
          </Can>
        )}
      </Card>
    );
  };

  return (
    <div className="orderDetails mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Order Details</title>
        <meta name="description" content="Description of Order Details" />
      </Helmet>
      <Row className="mt-4">
        <Col md="8" sm="12">
          {isLoading ? getOrderLoading() : getOrderComponent()}
        </Col>
        <Col md="4" sm="12">
          <Card>
            <CardHeader>Billing Address</CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <span className="text-primary font-weight-bold">
                    {get(billingAddress, "name", "-")}
                  </span>
                  <div>
                    <div>
                      {get(billingAddress, "address1", "-")},{" "}
                      {get(billingAddress, "address2", "-")}
                    </div>
                    <div>
                      {get(billingAddress, "city", "-")},{" "}
                      {get(billingAddress, "province", "-")}
                    </div>
                    <div>
                      {get(billingAddress, "country", "-")} -{" "}
                      {get(billingAddress, "phone", "-")}
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Shipping Address</CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <span className="text-primary font-weight-bold">
                    {get(shippingAddress, "name", "-")}
                  </span>
                  <div>
                    <div>
                      {get(shippingAddress, "address1", "-")},{" "}
                      {get(shippingAddress, "address2", "-")}
                    </div>
                    <div>
                      {get(shippingAddress, "city", "-")},{" "}
                      {get(shippingAddress, "province", "-")}
                    </div>
                    <div>
                      {get(shippingAddress, "country", "-")} -{" "}
                      {get(shippingAddress, "phone", "-")}
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <Form role="form" onSubmit={(e) => onSubmit(e)}>
                <FormGroup>
                  <Label>Add a Comment</Label>
                  <Row>
                    <Col>
                      <RtInput
                        onChange={(e) => setCommentText(e)}
                        type="text"
                        placeholder="Eg: High Priority"
                        name="comment"
                        value={commentText}
                      />
                    </Col>
                    <Button
                      color="primary"
                      onClick={(e) => onSubmit(e)}
                      disabled={commentText == ""}
                    >
                      Add
                    </Button>
                  </Row>
                </FormGroup>
              </Form>
            </CardHeader>
            <CardBody className="comments-box">
              {comments.map(({ text, userId: { name }, createdAt }, index) => (
                <Row key={index} className="mt-3 text-left ml-1">
                  <Col className="border rounded bg-gradient-secondary">
                    <div className="text-xs d-flex justify-content-between">
                      <span>{name}</span>
                      <span>{parseDate(createdAt, "DD/MM")}</span>
                    </div>
                    <div>{text}</div>
                  </Col>
                </Row>
              ))}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

OrderDetails.propTypes = {};
