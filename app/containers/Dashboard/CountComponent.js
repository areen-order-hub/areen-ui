import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import history from "utils/history";
import classnames from "classnames";
import Skeleton from "react-loading-skeleton";

const CountComponent = ({
  isCountLoading,
  noOfClients,
  noOfPositions,
  noOfCandidates,
  noOfRecruiters,
  noOfShortlisted,
  noOfSelected,
  noOfOffered,
  noOfJoined,
  userRole,
}) => {
  return (
    <>
      <Row className="d-flex flex-wrap">
        <Col
          className="col-xl-6 col-sm-6 mb-xl-0  hover-pointer"
          onClick={() => history.push("/clients")}
          sm="6"
        >
          <Card className="w-100">
            <CardBody className="p-3">
              <Row>
                <Col xs="8">
                  <p className="text-sm mb-0 text-uppercase font-weight-bold">
                    Clients
                  </p>
                  <h3 className="font-weight-bold text-primary">
                    {isCountLoading ? <Skeleton width="25%" /> : noOfClients}
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
          onClick={() => history.push("/positions")}
          sm="6"
        >
          <Card className="w-100">
            <CardBody className="p-3">
              <Row>
                <Col xs="8">
                  <p className="text-sm mb-0 text-uppercase font-weight-bold">
                    Positions
                  </p>
                  <h3 className="font-weight-bold text-primary">
                    {isCountLoading ? <Skeleton width="25%" /> : noOfPositions}
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
          onClick={() => history.push("/candidates")}
          sm="6"
        >
          <Card className="w-100">
            <CardBody className="p-3">
              <Row>
                <Col xs="8">
                  <p className="text-sm mb-0 text-uppercase font-weight-bold">
                    Candidates
                  </p>
                  <h3 className="font-weight-bold text-primary">
                    {isCountLoading ? <Skeleton width="25%" /> : noOfCandidates}
                  </h3>
                </Col>
                <Col xs="4" className="text-end">
                  <div className="icon icon-shape bg-gradient-info shadow-primary text-center text-secondary rounded-circle">
                    <i
                      className="fas fa-users text-lg opacity-10"
                      aria-hidden="true"
                    />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col
          className={classnames("col-xl-6 col-sm-6 mb-xl-0 ", {
            "hover-pointer": userRole === "admin",
          })}
          onClick={() => userRole === "admin" && history.push("/recruiters")}
          sm="6"
        >
          <Card className="w-100">
            <CardBody className="p-3">
              <Row>
                <Col xs="8">
                  <p className="text-sm mb-0 text-uppercase font-weight-bold">
                    Recruiters
                  </p>
                  <h3 className="font-weight-bold text-primary">
                    {isCountLoading ? <Skeleton width="25%" /> : noOfRecruiters}
                  </h3>
                </Col>
                <Col xs="4" className="text-end">
                  <div className="icon icon-shape bg-gradient-dark shadow-primary text-center text-secondary rounded-circle">
                    <i className="fas fa-user-tie text-lg opacity-10" />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col
          className="col-xl-6 col-sm-6 mb-xl-0 hover-pointer"
          onClick={() => history.push("/candidates?filter=Shortlisted")}
          sm="6"
        >
          <Card className="w-100">
            <CardBody className="p-3">
              <Row>
                <Col xs="8">
                  <p className="text-sm mb-0 text-uppercase font-weight-bold">
                    Shortlisted
                  </p>
                  <h3 className="font-weight-bold text-primary">
                    {isCountLoading ? (
                      <Skeleton width="25%" />
                    ) : (
                      noOfShortlisted
                    )}
                  </h3>
                </Col>
                <Col xs="4" className="text-end">
                  <div className="icon icon-shape bg-gradient-warning shadow-primary text-center text-secondary rounded-circle">
                    <i className="far fa-clipboard text-lg opacity-10" />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col
          className="col-xl-6 col-sm-6 mb-xl-0 hover-pointer"
          onClick={() => history.push("/candidates?filter=Selected")}
          sm="6"
        >
          <Card className="w-100">
            <CardBody className="p-3">
              <Row>
                <Col xs="8">
                  <p className="text-sm mb-0 text-uppercase font-weight-bold">
                    Selected
                  </p>
                  <h3 className="font-weight-bold text-primary">
                    {isCountLoading ? <Skeleton width="25%" /> : noOfSelected}
                  </h3>
                </Col>
                <Col xs="4" className="text-end">
                  <div className="icon icon-shape bg-gradient-success shadow-primary text-center text-secondary rounded-circle">
                    <i className="fas fa-check text-lg opacity-10" />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col
          className="col-xl-6 col-sm-6 mb-xl-0 hover-pointer"
          onClick={() => history.push("/candidates?filter=Offered")}
          sm="6"
        >
          <Card className="w-100">
            <CardBody className="p-3">
              <Row>
                <Col xs="8">
                  <p className="text-sm mb-0 text-uppercase font-weight-bold">
                    Offered
                  </p>
                  <h3 className="font-weight-bold text-primary">
                    {isCountLoading ? <Skeleton width="25%" /> : noOfOffered}
                  </h3>
                </Col>
                <Col xs="4" className="text-end">
                  <div className="icon icon-shape bg-gradient-primary shadow-primary text-center text-secondary rounded-circle">
                    <i className="fas fa-handshake text-lg opacity-10" />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col
          className="col-xl-6 col-sm-6 mb-xl-0 hover-pointer"
          onClick={() => history.push("/candidates?filter=Joined")}
          sm="6"
        >
          <Card className="w-100">
            <CardBody className="p-3">
              <Row>
                <Col xs="8">
                  <p className="text-sm mb-0 text-uppercase font-weight-bold">
                    Joined
                  </p>
                  <h3 className="font-weight-bold text-primary">
                    {isCountLoading ? <Skeleton width="25%" /> : noOfJoined}
                  </h3>
                </Col>
                <Col xs="4" className="text-end">
                  <div className="icon icon-shape bg-gradient-info shadow-primary text-center text-secondary rounded-circle">
                    <i className="fas fa-briefcase text-lg opacity-10" />
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
