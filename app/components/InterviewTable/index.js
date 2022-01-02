/**
 *
 * TaskTable
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Card,
  CardBody,
  Badge,
  Table,
} from "reactstrap";
import Skeleton from "react-loading-skeleton";
import { parseDateTime } from "utils/dateTimeHelpers";
import history from "utils/history";
import { getRoundBadge } from "utils/componentHelpers";

export function InterviewsTableSkeleton() {
  return (
    <Card className="mx-3 w-100">
      <CardBody>
        <Skeleton count={3} />
      </CardBody>
    </Card>
  );
}

function InterviewTable({
  interviews = [],
  userRole,
  forDashboard,
  forPosition,
  forCandidate,
}) {
  const getHeadersForDashboard = () => (
    <tr>
      <th scope="col">Candidate Name</th>
      <th scope="col">Position</th>
      <th scope="col">Client</th>
      <th scope="col">Round</th>
      <th scope="col">Time</th>
      <th scope="col">{userRole === "admin" ? "Recruiter" : "Acc. Holder"}</th>
      <th scope="col">Mob. No</th>
    </tr>
  );

  const getBodyForDashboard = () => {
    if (!interviews || interviews.length == 0) {
      return (
        <tr>
          <td colSpan="7" className="text-center">
            No Interviews Scheduled
          </td>
        </tr>
      );
    }
    return interviews.map(
      (
        {
          clientId: { _id: clientId, name: clientName, alias: clientAlias },
          positionId: {
            _id: positionId,
            jobTitle,
            recruiterAssigned,
            spocId: { accHolder },
          },
          candidateId: { _id: candidateId, name: candidateName, phoneNumber },
          round,
          dateTime,
        },
        index
      ) => {
        const { time } = parseDateTime(dateTime);
        return (
          <tr key={index}>
            <td
              className="hover-pointer text-primary"
              onClick={() => history.push(`/candidate/${candidateId}`)}
            >
              {candidateName}
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
            <td>{time}</td>
            <td>
              {userRole === "admin" ? recruiterAssigned.name : accHolder.name}
            </td>
            <td>{phoneNumber}</td>
          </tr>
        );
      }
    );
  };

  const getHeadersForPosition = () => (
    <tr>
      <th scope="col">Candidate Name</th>
      <th scope="col">Round</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Mode</th>
      <th scope="col">Venue</th>
      <th scope="col">{userRole === "admin" ? "Recruiter" : "Acc. Holder"}</th>
      <th scope="col">Mob. No</th>
    </tr>
  );

  const getBodyForPosition = () => {
    if (!interviews || interviews.length == 0) {
      return (
        <tr>
          <td colSpan="8" className="text-center">
            No Interviews Scheduled
          </td>
        </tr>
      );
    }
    return interviews.map(
      (
        {
          positionId: {
            recruiterAssigned,
            spocId: { accHolder },
          },
          candidateId: { _id: candidateId, name: candidateName, phoneNumber },
          round,
          interviewMode,
          venue,
          dateTime,
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
              {candidateName}
            </td>
            <td>{getRoundBadge(round)}</td>
            <td>{date}</td>
            <td>{time}</td>
            <td>{interviewMode}</td>
            <td>{venue}</td>
            <td>
              {userRole === "admin" ? recruiterAssigned.name : accHolder.name}
            </td>
            <td>{phoneNumber}</td>
          </tr>
        );
      }
    );
  };

  const getHeadersForCandidate = () => (
    <tr>
      <th scope="col">Round</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Mode</th>
      <th scope="col">Venue</th>
      <th scope="col">{userRole === "admin" ? "Recruiter" : "Acc. Holder"}</th>
      <th scope="col">Mob. No</th>
    </tr>
  );

  const getBodyForCandidate = () => {
    if (!interviews || interviews.length == 0) {
      return (
        <tr>
          <td colSpan="7" className="text-center">
            No Interviews Scheduled
          </td>
        </tr>
      );
    }
    return interviews.map(
      (
        {
          positionId: {
            recruiterAssigned,
            spocId: { accHolder },
          },
          candidateId: { phoneNumber },
          round,
          interviewMode,
          venue,
          dateTime,
        },
        index
      ) => {
        const { date, time } = parseDateTime(dateTime);
        return (
          <tr key={index}>
            <td>{getRoundBadge(round)}</td>
            <td>{date}</td>
            <td>{time}</td>
            <td>{interviewMode}</td>
            <td>{venue}</td>
            <td>
              {userRole === "admin" ? recruiterAssigned.name : accHolder.name}
            </td>
            <td>{phoneNumber}</td>
          </tr>
        );
      }
    );
  };

  return (
    <div className="taskTable w-100">
      <div className="table-responsive">
        <Table className="align-items-center responsive">
          <thead className="thead-light">
            {forDashboard && getHeadersForDashboard()}
            {forPosition && getHeadersForPosition()}
            {forCandidate && getHeadersForCandidate()}
          </thead>
          <tbody>
            {forDashboard && getBodyForDashboard()}
            {forPosition && getBodyForPosition()}
            {forCandidate && getBodyForCandidate()}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

InterviewTable.propTypes = {
  interviews: PropTypes.array.isRequired,
};

InterviewTable.defaultProps = {
  interviews: [],
};

export default memo(InterviewTable);
