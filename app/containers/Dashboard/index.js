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

  const {
    isCountLoading,
    noOfClients,
    noOfCandidates,
    noOfPositions,
    noOfRecruiters,
    noOfShortlisted,
    noOfSelected,
    noOfOffered,
    noOfJoined,
    isInterviewsLoading,
    todaysInterviews,
    tomorrowsInterviews,
    isEventsLoading,
    events,
  } = useSelector((state) => ({
    isCountLoading: selectors.isCountLoading(state),
    noOfClients: selectors.noOfClients(state),
    noOfCandidates: selectors.noOfCandidates(state),
    noOfPositions: selectors.noOfPositions(state),
    noOfRecruiters: selectors.noOfRecruiters(state),
    noOfShortlisted: selectors.noOfShortlisted(state),
    noOfSelected: selectors.noOfSelected(state),
    noOfOffered: selectors.noOfOffered(state),
    noOfJoined: selectors.noOfJoined(state),
    isInterviewsLoading: selectors.isInterviewsLoading(state),
    todaysInterviews: selectors.todaysInterviews(state),
    tomorrowsInterviews: selectors.tomorrowsInterviews(state),
    isEventsLoading: selectors.isEventsLoading(state),
    events: selectors.events(state),
  }));

  // React.useEffect(() => {
  //   dispatch(operations.getCount());
  //   dispatch(operations.fetchInterviews());
  //   dispatch(operations.fetchEvents());
  // }, []);

  return (
    <div className="dashboard mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <Row className="mt-3">
        <h1 className="ml-2">Welcome {selectors.userName(cookie)}!</h1>
      </Row>
    </div>
  );
}

Dashboard.propTypes = {};
