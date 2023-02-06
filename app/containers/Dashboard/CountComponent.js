import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import history from "utils/history";
import classnames from "classnames";
import Skeleton from "react-loading-skeleton";

const CountComponent = ({
  isCountLoading,
  noOfStores,
  noOfActiveStores,
  noOfOrders,
  noOfUnfulfilledOrders,
}) => {
  return (
    <>
      <Row className="d-flex flex-wrap">
        <Col
          className="col-xl-6 col-sm-6 mb-xl-0  hover-pointer"
          onClick={() => history.push("/stores")}
          sm="6"
        >
          <Card className="w-100">
            <CardBody className="p-3">
              <Row>
                <Col xs="8">
                  <p className="text-sm mb-0 text-uppercase font-weight-bold">
                    Stores
                  </p>
                  <h3 className="font-weight-bold text-primary">
                    {isCountLoading ? <Skeleton width="25%" /> : noOfStores}
                  </h3>
                </Col>
                <Col xs="4" className="text-end">
                  <div className="icon icon-shape bg-gradient-danger shadow-primary text-center text-secondary rounded-circle">
                    <i
                      className="far fa-building text-lg opacity-10"
                      aria-hidden="true"
                    />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col
          className="col-xl-6 col-sm-6 mb-xl-0  hover-pointer"
          onClick={() => history.push("/stores")}
          sm="6"
        >
          <Card className="w-100">
            <CardBody className="p-3">
              <Row>
                <Col xs="8">
                  <p className="text-sm mb-0 text-uppercase font-weight-bold">
                    Active Stores
                  </p>
                  <h3 className="font-weight-bold text-primary">
                    {isCountLoading ? (
                      <Skeleton width="25%" />
                    ) : (
                      noOfActiveStores
                    )}
                  </h3>
                </Col>
                <Col xs="4" className="text-end">
                  <div className="icon icon-shape bg-gradient-danger shadow-primary text-center text-secondary rounded-circle">
                    <i
                      className="far fa-building text-lg opacity-10"
                      aria-hidden="true"
                    />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col
          className="col-xl-6 col-sm-6 mb-xl-0  hover-pointer"
          onClick={() => history.push("/orders")}
          sm="6"
        >
          <Card className="w-100">
            <CardBody className="p-3">
              <Row>
                <Col xs="8">
                  <p className="text-sm mb-0 text-uppercase font-weight-bold">
                    Orders
                  </p>
                  <h3 className="font-weight-bold text-primary">
                    {isCountLoading ? <Skeleton width="25%" /> : noOfOrders}
                  </h3>
                </Col>
                <Col xs="4" className="text-end">
                  <div className="icon icon-shape bg-gradient-success shadow-primary text-center text-secondary rounded-circle">
                    <i
                      className="fas fa-file-signature text-lg opacity-10"
                      aria-hidden="true"
                    />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col
          className="col-xl-6 col-sm-6 mb-xl-0  hover-pointer"
          onClick={() => history.push("/orders")}
          sm="6"
        >
          <Card className="w-100">
            <CardBody className="p-3">
              <Row>
                <Col xs="8">
                  <p className="text-sm mb-0 text-uppercase font-weight-bold">
                    Unfulfilled Orders
                  </p>
                  <h3 className="font-weight-bold text-primary">
                    {isCountLoading ? (
                      <Skeleton width="25%" />
                    ) : (
                      noOfUnfulfilledOrders
                    )}
                  </h3>
                </Col>
                <Col xs="4" className="text-end">
                  <div className="icon icon-shape bg-gradient-success shadow-primary text-center text-secondary rounded-circle">
                    <i
                      className="fas fa-file-signature text-lg opacity-10"
                      aria-hidden="true"
                    />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CountComponent;
