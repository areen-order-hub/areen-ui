/**
 *
 * OrderDetails
 *
 */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import { Card, CardHeader, CardBody, Row, Col, Badge, Table } from "reactstrap";
import { get, map } from "lodash";
import Skeleton from "react-loading-skeleton";
import reducer from "./reducer";
import history from "utils/history";
import * as operations from "./actions";
import * as selectors from "./selectors";
import "./orderDetailsStyle.scss";

export default function OrderDetails({ match }) {
  useInjectReducer({ key: "orderDetails", reducer });
  const dispatch = useDispatch();
  const {
    isLoading,
    shopifyDisplayId,
    shopifyOrderDate,
    status,
    syncedAt,
    storeDetails,
    billingAddress,
    invoiceDetails,
  } = useSelector((state) => ({
    shopifyDisplayId: selectors.shopifyDisplayId(state),
    shopifyOrderDate: selectors.shopifyOrderDate(state),
    status: selectors.status(state),
    syncedAt: selectors.syncedAt(state),
    storeDetails: selectors.storeDetails(state),
    billingAddress: selectors.billingAddress(state),
    invoiceDetails: selectors.invoiceDetails(state),
    isLoading: selectors.isLoading(state),
  }));

  useEffect(() => {
    const { id } = match.params;
    if (!id) {
      history.push("/orders");
    } else {
      dispatch(operations.fetchOrder(id));
    }
    return () => dispatch(operations.orderDetailsInit());
  }, []);

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

  const getOrderComponent = () => {
    return (
      <Card>
        <CardHeader>
          <Row className="px-1">
            <Col xs="12" md="10" className="align-items-center">
              <span className="h1 mr-2 text-primary">#{shopifyDisplayId}</span>
              <span>
                <Badge color="dark">{status}</Badge>
              </span>
            </Col>
          </Row>
          <Row className="mx-1 mt-3 text-md text-muted">
            <div className="mr-3" title="Shopify Order Date">
              <i className="far fa-building mr-1" />
              {shopifyOrderDate}
            </div>
            <div className="mr-3" title="Last Sync At">
              <i className="far fa-calendar-alt mr-1" />
              {syncedAt}
            </div>
            <div
              className="mr-3 hover-pointer text-underline"
              title="Store"
              onClick={() =>
                history.push(`/store/${get(storeDetails, "_id", "")}`)
              }
            >
              <i className="far fa-building mr-1" />
              {get(storeDetails, "name", "--")}
            </div>
          </Row>
        </CardHeader>
        <CardHeader>
          <div className="mb-3">
            <span className="h3 text-muted">Invoice Details</span>
          </div>
          <p>
            <span className="text-muted">Price: </span>
            <span className="text-primary font-weight-bold">
              {get(invoiceDetails, "price", "0.00")}
            </span>
          </p>
          <div className="w-100">
            <div className="table-responsive">
              <Table className="align-items-center responsive">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Item Code</th>
                    <th scope="col">Ordered Quantity</th>
                    <th scope="col">Fulfilled Quantity</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {map(
                    get(invoiceDetails, "items", []),
                    ({ itemCode, quantity, unitPrice, price }, index) => (
                      <tr key={index}>
                        <td>{itemCode}</td>
                        <td>{quantity}</td>
                        <td>{quantity}</td>
                        <td>{unitPrice}</td>
                        <td>{price}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </CardHeader>
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
                    {get(billingAddress, "name", "--")}
                  </span>
                  <div>
                    <div>
                      {get(billingAddress, "address1", "--")},{" "}
                      {get(billingAddress, "address2", "--")}
                    </div>
                    <div>
                      {get(billingAddress, "city", "--")},{" "}
                      {get(billingAddress, "province", "--")}
                    </div>
                    <div>
                      {get(billingAddress, "country", "--")} -{" "}
                      {get(billingAddress, "phone", "--")}
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

OrderDetails.propTypes = {};
