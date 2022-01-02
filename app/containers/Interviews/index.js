/**
 *
 * Interviews
 *
 */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import * as operations from "./actions";
import * as selectors from "./selectors";
import history from "utils/history";
import { parseDateTime } from "utils/dateTimeHelpers";
import { Row, Col, Button, Table } from "reactstrap";
import { getRoundBadge, getCandidateStatusBadge } from "utils/componentHelpers";
import { truncateText } from "utils/helperMethods";
import "./interviewsStyle.scss";

export default function Interviews() {
  useInjectReducer({ key: "interviews", reducer });
  const dispatch = useDispatch();

  const { interviews, isLoading } = useSelector((state) => ({
    interviews: selectors.interviews(state),
    isLoading: selectors.isLoading(state),
  }));

  const [filterTab, setFilterTab] = useState("All");

  useEffect(() => {
    dispatch(operations.fetchInterviews());
  }, []);

  const getInterviewData = () =>
    interviews.map(
      (
        {
          clientId: { _id: clientId, name: clientName, alias: clientAlias },
          positionId: {
            _id: positionId,
            jobTitle,
            recruiterAssigned,
            spocId: { accHolder },
          },
          candidateId: {
            _id: candidateId,
            name: candidateName,
            phoneNumber,
            recruitmentStatus,
          },
          round,
          dateTime,
          venue,
          interviewMode,
        },
        index
      ) => {
        const { date, time } = parseDateTime(dateTime);
        return (
          <tr key={index}>
            <td
              className="hover-pointer text-primary"
              onClick={() => history.push(`/candidate/${candidateId}`)}
            >
              {candidateName} {getCandidateStatusBadge(recruitmentStatus)}
            </td>
            <td
              className="hover-pointer text-primary"
              onClick={() => history.push(`/position/${positionId}`)}
            >
              {jobTitle}
            </td>
            <td
              className="hover-pointer text-primary"
              onClick={() => history.push(`/client/${clientId}`)}
            >
              {clientAlias || clientName}
            </td>
            <td>{getRoundBadge(round)}</td>
            <td>{date}</td>
            <td>{time}</td>
            <td>{interviewMode}</td>
            <td title={venue}>{truncateText(venue, 20)}</td>
            <td>{recruiterAssigned.name}</td>
            <td>{accHolder.name}</td>
            <td>{phoneNumber}</td>
          </tr>
        );
      }
    );

  const triggerDispatch = (round) => {
    switch (round) {
      case "All":
        dispatch(operations.fetchInterviews());
        break;
      case "Round 1":
        dispatch(operations.fetchInterviews({ round }));
        break;
      case "Round 2":
        dispatch(operations.fetchInterviews({ round }));
        break;
      case "Round 3":
        dispatch(operations.fetchInterviews({ round }));
        break;
      case "Final Round":
        dispatch(operations.fetchInterviews({ round }));
        break;
      default:
        dispatch(operations.fetchInterviews());
        break;
    }
  };

  return (
    <div className="interviews  mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Interviews</title>
        <meta name="description" content="Description of Interviews" />
      </Helmet>
      <Row className="mt-3 mb-3 d-flex align-items-center">
        <Col md="6">
          <div className="ml-2">
            {["All", "Round 1", "Round 2", "Round 3", "Final Round"].map(
              (title, index) => (
                <Button
                  size="sm"
                  key={index}
                  color={filterTab == title ? "primary" : "secondary"}
                  onClick={() => {
                    triggerDispatch(title);
                    setFilterTab(title);
                  }}
                >
                  {title}
                </Button>
              )
            )}
          </div>
        </Col>
      </Row>
      <div className="table-responsive">
        <Table className="align-items-center">
          <thead className="thead-light">
            <tr>
              <th scope="col">Candidate Name</th>
              <th scope="col">Position</th>
              <th scope="col">Client</th>
              <th scope="col">Round</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Mode</th>
              <th scope="col">Venue</th>
              <th scope="col">Recruiter</th>
              <th scope="col">Account Holder</th>
              <th scope="col">Mob. No</th>
            </tr>
          </thead>
          <tbody>{getInterviewData()}</tbody>
        </Table>
      </div>
    </div>
  );
}

Interviews.propTypes = {};
