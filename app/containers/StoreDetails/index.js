/**
 *
 * StoreDetails
 *
 */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Card, CardHeader, CardBody, Row, Col, Badge } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import history from "utils/history";
import * as operations from "./actions";
import * as selectors from "./selectors";
import "./storeDetailsStyle.scss";

export default function StoreDetails({ match }) {
  useInjectReducer({ key: "storeDetails", reducer });
  const dispatch = useDispatch();
  const {
    name,
    alias,
    shopifyURL,
    createdAt,
    isActive,
    isLoading,
  } = useSelector((state) => ({
    name: selectors.name(state),
    alias: selectors.alias(state),
    shopifyURL: selectors.shopifyURL(state),
    createdAt: selectors.createdAt(state),
    isActive: selectors.isActive(state),
    isLoading: selectors.isLoading(state),
  }));

  useEffect(() => {
    const { id } = match.params;
    if (!id) {
      history.push("/stores");
    } else {
      dispatch(operations.fetchStore(id));
    }
    return () => dispatch(operations.storeDetailsInit());
  }, []);

  const getStoreLoading = () => {
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

  const getStoreComponent = () => {
    return (
      <Card>
        <CardHeader>
          <Row className="px-1">
            <Col xs="12" md="10" className="align-items-center">
              <span className="h1 mr-2 text-primary">{name}</span>
              <span>
                <Badge color={isActive ? "success" : "dark"}>
                  {isActive ? "Active" : "Inactive"}
                </Badge>
              </span>
            </Col>
          </Row>
          <Row className="mx-1 mt-3 text-md text-muted">
            <div className="mr-3" title="Alias">
              <i className="far fa-building mr-1" />
              {alias}
            </div>
            <div className="mr-3" title="Created At">
              <i className="far fa-calendar-alt mr-1" />
              {createdAt}
            </div>
          </Row>
        </CardHeader>
        <CardHeader>
          <div className="mb-3">
            <span className="h3 text-muted">Store Details</span>
          </div>
          <p>
            <span className="text-muted">URL: </span>
            <span className="text-primary font-weight-bold">{shopifyURL}</span>
          </p>
        </CardHeader>
      </Card>
    );
  };
  return (
    <div className="storeDetails mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Store Details</title>
        <meta name="description" content="Description of Store Details" />
      </Helmet>
      <Row className="mt-4">
        <Col xs="12" md="12">
          {isLoading ? getStoreLoading() : getStoreComponent()}
        </Col>
      </Row>
    </div>
  );
}

StoreDetails.propTypes = {};
