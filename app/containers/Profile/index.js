/**
 *
 * Profile
 *
 */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Table,
} from "reactstrap";
import Skeleton from "react-loading-skeleton";
import reducer from "./reducer";
import * as operations from "./actions";
import * as selectors from "./selectors";
import history from "utils/history";
import "./profileStyle.scss";

export default function Profile({ match }) {
  useInjectReducer({ key: "profile", reducer });
  const dispatch = useDispatch();

  const { name, designation, email, joiningDate, isLoading } = useSelector(
    (state) => ({
      name: selectors.name(state),
      designation: selectors.designation(state),
      email: selectors.email(state),
      joiningDate: selectors.joiningDate(state),
      isLoading: selectors.isLoading(state),
    })
  );

  useEffect(() => {
    const { id } = match.params;
    if (!id) {
      history.push("/dashboard");
    } else {
      dispatch(operations.fetchProfile(id));
    }

    return () => dispatch(operations.initProfileDetails());
  }, []);

  const getProfileLoading = () => {
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

  const getProfileComponent = () => {
    return (
      <>
        <Card>
          <CardHeader>
            <Row className="px-1">
              <Col>
                <span className="h1 text-primary">{name}</span>
              </Col>
            </Row>
            <Row className="mx-1 mt-3 text-md text-muted">
              <div className="mr-3" title="Email">
                <i className="far fa-envelope mr-1" />
                {email}
              </div>
              <div className="mr-3" title="Joining Date">
                <i className="far fa-calendar-alt mr-1" />
                {joiningDate}
              </div>
              <div className="mr-3" title="Designation">
                <i className="fas fa-file-signature mr-1" />
                {designation}
              </div>
            </Row>
          </CardHeader>
        </Card>
      </>
    );
  };

  return (
    <div className="profile mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Description of Profile" />
      </Helmet>
      <Row className="mt-4">
        <Col xs="12" md="9">
          {isLoading ? getProfileLoading() : getProfileComponent()}
        </Col>
      </Row>
    </div>
  );
}

Profile.propTypes = {};
