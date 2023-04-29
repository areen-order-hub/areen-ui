/**
 *
 * Dashboard
 *
 */

import React from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col } from "reactstrap";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./dashboardStyle.scss";
import { useAccess } from "utils/permissions";
import CountComponent from "./CountComponent";

export default function Dashboard() {
  useInjectReducer({ key: "dashboard", reducer });
  const dispatch = useDispatch();
  const [cookie] = useCookies(["user"]);

  const {
    isCountLoading,
    noOfStores,
    noOfActiveStores,
    noOfOrders,
    noOfAssignedOrders,
    noOfDeliveredOrders,
  } = useSelector((state) => ({
    isCountLoading: selectors.isCountLoading(state),
    noOfStores: selectors.noOfStores(state),
    noOfActiveStores: selectors.noOfActiveStores(state),
    noOfOrders: selectors.noOfOrders(state),
    noOfAssignedOrders: selectors.noOfAssignedOrders(state),
    noOfDeliveredOrders: selectors.noOfDeliveredOrders(state),
  }));

  React.useEffect(() => {
    dispatch(operations.fetchDashboardStats());
  }, []);

  return (
    <div className="dashboard mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <Row className="mt-3">
        <h1 className="ml-2">Welcome {selectors.userName(cookie)}!</h1>
      </Row>
      <Row>
        <Col md="6">
          <p className="text-primary font-weight-bold mb-1">
            Quick Stats{" "}
            <span className="text-sm text-muted">(Total Count)</span>
          </p>
          <CountComponent
            {...{
              isCountLoading,
              noOfStores,
              noOfActiveStores,
              noOfOrders,
              noOfAssignedOrders,
              noOfDeliveredOrders,
              hasStoreAccess: useAccess("Stores", "read"),
              hasOrderAccess: useAccess("Orders", "read"),
              hasDeliveryAccess: useAccess("Delivery", "read"),
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

Dashboard.propTypes = {};
