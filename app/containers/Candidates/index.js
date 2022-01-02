/**
 *
 * Candidates
 *
 */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "query-string";
import { Helmet } from "react-helmet";
import { Row, Col, Button, Table, Input } from "reactstrap";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import { debounce } from "lodash";
import history from "../../utils/history";
import * as selectors from "./selectors";
import * as operations from "./actions";
import { parseDate } from "utils/dateTimeHelpers";
import { getCandidateStatusBadge } from "utils/componentHelpers";
import "./candidatesStyle.scss";

export default function Candidates() {
  useInjectReducer({ key: "candidates", reducer });
  const dispatch = useDispatch();
  const { isLoading, candidates } = useSelector((state) => ({
    isLoading: selectors.isLoading(state),
    candidates: selectors.candidates(state),
  }));

  const [filterTab, setFilterTab] = useState("All");

  const onSearchTextChanged = (e) => {
    e.persist();
    delayedSearch(e.target.value);
  };

  const searchPattern = (e) => {
    if (e == "") {
      e = "null";
    }
    dispatch(operations.searchForCandidates(e));
  };

  const delayedSearch = debounce(searchPattern, 1000);

  React.useEffect(() => {
    const filter = qs.parse(location.search).filter;
    if (filter) {
      triggerDispatch(filter);
      setFilterTab(filter);
    } else {
      dispatch(operations.fetchCandidates());
    }
  }, []);

  const onClick = (id) =>
    history.push({
      pathname: `/candidate/${id}`,
      state: { id },
    });

  const goToPosition = (id) =>
    history.push({
      pathname: `/position/${id}`,
      state: { id },
    });

  const getCandidateData = () => {
    return candidates.map(
      ({
        id,
        name,
        phoneNumber,
        presentCTC,
        presentCTCRemarks,
        expectedCTC,
        expectedCTCRemarks,
        yearsOfExperience,
        presentLocation,
        createdAt,
        recruitmentStatus,
        positionId: { _id: positionId, jobTitle },
      }) => (
        <React.Fragment key={id}>
          <tr>
            <td
              className="hover-pointer text-primary"
              onClick={() => onClick(id)}
            >
              {name} {getCandidateStatusBadge(recruitmentStatus)}
            </td>
            <td>{phoneNumber}</td>
            <td>
              {presentCTC} {presentCTCRemarks}
            </td>
            <td>
              {expectedCTC} {expectedCTCRemarks}
            </td>
            <td>{`${yearsOfExperience.split(".")[0]}Y ${
              yearsOfExperience.split(".")[1]
            }M`}</td>
            <td>{presentLocation}</td>
            <td>{jobTitle}</td>
            <td>{parseDate(createdAt, "DD MMM YYYY")}</td>
            <td>
              <Button
                title="View Candidate"
                type="button"
                color="info"
                size="sm"
                onClick={(e) => onClick(id)}
              >
                <span className="btn-inner--icon">
                  <i className="fas fa-eye" />
                </span>
              </Button>
              <Button
                title="Go to Position"
                type="button"
                color="primary"
                size="sm"
                onClick={(e) => goToPosition(positionId)}
              >
                <span className="btn-inner--icon">
                  <i className="fas fa-external-link-alt" />
                </span>
              </Button>
            </td>
          </tr>
        </React.Fragment>
      )
    );
  };

  const triggerDispatch = (filter) => {
    switch (filter) {
      case "All":
        dispatch(operations.fetchCandidates());
        break;
      case "Shortlisted":
        dispatch(
          operations.fetchCandidates({
            shortlisted: true,
          })
        );
        break;
      case "Scheduled":
        dispatch(operations.fetchCandidates({ scheduled: true }));
        break;
      case "Selected":
        dispatch(operations.fetchCandidates({ recruitmentStatus: "Selected" }));
        break;
      case "Offered":
        dispatch(operations.fetchCandidates({ recruitmentStatus: "Offered" }));
        break;
      case "Joined":
        dispatch(operations.fetchCandidates({ recruitmentStatus: "Joined" }));
      default:
        break;
    }
  };

  return (
    <div className="candidates mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Candidates</title>
        <meta name="description" content="Description of Candidates" />
      </Helmet>
      <Row className="mt-3 mb-3 d-flex align-items-center">
        <Col md="6">
          <div className="ml-2">
            {[
              "All",
              "Shortlisted",
              "Scheduled",
              "Selected",
              "Offered",
              "Joined",
            ].map((title, index) => (
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
            ))}
          </div>
        </Col>
        <div className="align-items-right mr-3 ml-auto">
          <Row>
            <Col>
              <Input
                onChange={(e) => onSearchTextChanged(e)}
                type="text"
                placeholder="Enter search query"
                name="searchString"
              />
            </Col>
          </Row>
        </div>
      </Row>
      <div className="table-responsive">
        <Table className="mt-3 align-items-center">
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Present CTC</th>
              <th scope="col">Expected CTC</th>
              <th scope="col">Years Of Experience</th>
              <th scope="col">Location</th>
              <th scope="col">Position Applied</th>
              <th scope="col">Created At</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{getCandidateData()}</tbody>
        </Table>
      </div>
    </div>
  );
}

Candidates.propTypes = {};
