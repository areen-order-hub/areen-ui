/**
 *
 * Dashboard
 *
 */

import React from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import {
  Row,
  Col,
  Button,
  Container,
  Card,
  CardHeader,
  CardBody,
  Spinner,
} from "reactstrap";
import { useInjectReducer } from "utils/injectReducer";
import Tag from "../../components/Tag";
import history from "utils/history";
import InterviewTable, {
  InterviewsTableSkeleton,
} from "../../components/InterviewTable";
import CalendarCard from "components/CalendarCard";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import reducer from "./reducer";
import moment from "moment-timezone";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./dashboardStyle.scss";
import { parseDateTime } from "utils/dateTimeHelpers";
import CountComponent from "./CountComponent";

export default function Dashboard() {
  useInjectReducer({ key: "dashboard", reducer });
  const dispatch = useDispatch();
  const [cookie] = useCookies(["user"]);

  const { isCountLoading, noOfStores, noOfOrders } = useSelector((state) => ({
    isCountLoading: selectors.isCountLoading(state),
    noOfStores: selectors.noOfStores(state),
    noOfOrders: selectors.noOfOrders(state),
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
        <Col md="4">
          <p className="text-primary font-weight-bold mb-1">
            Quick Stats{" "}
            <span className="text-sm text-muted">(Total Count)</span>
          </p>
          <CountComponent {...{ isCountLoading, noOfStores, noOfOrders }} />
        </Col>
      </Row>
    </div>
  );
}

Dashboard.propTypes = {};
