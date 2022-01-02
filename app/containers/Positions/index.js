/**
 *
 * Positions
 *
 */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import {
  Row,
  Col,
  Button,
  Badge,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import RtSelect from "components/RtSelect";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import history from "../../utils/history";
import * as selectors from "./selectors";
import * as operations from "./actions";
import classnames from "classnames";
import Can from "components/Can";
import { permissions } from "utils/permissions";
import { useCookies } from "react-cookie";
import { getPositionStatusBadge } from "utils/componentHelpers";
import { positionStatusOptions } from "utils/hikersConstants";
import { parseDate } from "utils/dateTimeHelpers";
import { truncateText } from "utils/helperMethods";
import { debounce } from "lodash";
import "./positionsStyle.scss";

export default function Positions() {
  useInjectReducer({ key: "positions", reducer });
  const dispatch = useDispatch();
  const {
    isLoading,
    positions,
    availableClients,
    availableRecruiters,
    availableSpocs,
  } = useSelector((state) => ({
    isLoading: selectors.isLoading(state),
    positions: selectors.positions(state),
    availableClients: selectors.availableClients(state),
    availableRecruiters: selectors.availableRecruiters(state),
    availableSpocs: selectors.availableSpocs(state),
  }));

  const [cookie] = useCookies(["user"]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [positionStatus, setPositionStatus] = useState("");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [filterTab, setFilterTab] = useState(0);

  const [selectedClient, setSelectedClient] = useState("undefined");
  const [selectedRecruiter, setSelectedRecruiter] = useState("undefined");
  const [selectedSpoc, setSelectedSpoc] = useState("undefined");

  const onSearchTextChanged = (e) => {
    e.persist();
    delayedSearch(e.target.value);
  };

  const searchPattern = (val) => {
    if (val == "") {
      val = "null";
    }
    dispatch(
      operations.fetchPositions(
        selectors.getUserId(cookie),
        selectors.userRole(cookie),
        { searchText: val }
      )
    );
  };

  const delayedSearch = debounce(searchPattern, 1000);

  React.useEffect(() => {
    dispatch(
      operations.fetchPositions(
        selectors.getUserId(cookie),
        selectors.userRole(cookie),
        { clientId: selectedClient }
      )
    );
  }, [selectedClient]);

  React.useEffect(() => {
    dispatch(
      operations.fetchPositions(
        selectors.getUserId(cookie),
        selectors.userRole(cookie),
        { recruiterAssigned: selectedRecruiter }
      )
    );
  }, [selectedRecruiter]);

  React.useEffect(() => {
    dispatch(
      operations.fetchPositions(
        selectors.getUserId(cookie),
        selectors.userRole(cookie),
        { spocId: selectedSpoc }
      )
    );
  }, [selectedSpoc]);

  React.useEffect(() => {
    dispatch(
      operations.fetchPositions(
        selectors.getUserId(cookie),
        selectors.userRole(cookie)
      )
    );
    dispatch(operations.fetchClients());
    dispatch(operations.fetchRecruiters());
    dispatch(operations.fetchSpocs());
  }, []);

  const onClick = (id) =>
    history.push({
      pathname: `/position/${id}`,
      state: { id },
    });

  const getPositionData = () => {
    return positions.map(
      ({
        id,
        jobTitle,
        receivedDate,
        clientId: {
          name: clientName,
          alias: clientAlias,
          industry: clientIndustry,
        },
        minYearsOfExperience,
        maxYearsOfExperience,
        yearsOfExperienceRemarks,
        minBudget,
        maxBudget,
        budgetRemarks,
        location,
        spocId: {
          name: spocName,
          accHolder: { name: accHolderName },
        },
        recruiterAssigned,
        positionStatus,
        addedBy,
      }) => (
        <React.Fragment key={id}>
          <tr>
            <td
              className={classnames("hover-pointer", {
                "text-primary": clientIndustry == "Manufacturing",
                "text-warning": clientIndustry == "IT",
              })}
              onClick={() => onClick(id)}
            >
              {jobTitle} <span>{getPositionStatusBadge(positionStatus)}</span>{" "}
              <span>
                <Badge color="dark" className="text-secondary">
                  {parseDate(receivedDate, "DD MMM YYYY")}
                </Badge>
              </span>
            </td>
            <td>{clientAlias || clientName}</td>
            <td>
              {`${minYearsOfExperience} - ${maxYearsOfExperience}`}
              {yearsOfExperienceRemarks && (
                <span className="text-info" title={yearsOfExperienceRemarks}>
                  {" "}
                  <i className="fas fa-info-circle" />
                </span>
              )}
            </td>
            <td>
              {`${minBudget} - ${maxBudget}`}
              {budgetRemarks && (
                <span className="text-info" title={budgetRemarks}>
                  {" "}
                  <i className="fas fa-info-circle" />
                </span>
              )}
            </td>
            <td>{location}</td>
            <td>{spocName || "-"}</td>
            <td>{recruiterAssigned ? recruiterAssigned.name : "-"}</td>
            <td>{accHolderName || "-"}</td>
            <td>
              <Button
                title="View Position"
                type="button"
                color="info"
                size="sm"
                onClick={(e) => onClick(id)}
              >
                <span className="btn-inner--icon">
                  <i className="fas fa-eye" />
                </span>
              </Button>
              <Can
                permissions={[
                  permissions.UPDATE_A_POSITION,
                  {
                    permission: permissions.UPDATE_MY_POSITION,
                    value: addedBy === selectors.getUserId(cookie),
                  },
                ]}
              >
                <Button
                  title="Edit Position"
                  type="button"
                  color="primary"
                  size="sm"
                  onClick={(e) => history.push(`/add-position?id=${id}`)}
                >
                  <span className="btn-inner--icon">
                    <i className="fas fa-edit" />
                  </span>
                </Button>
                <Button
                  title="Change Position Status"
                  type="button"
                  color="light"
                  size="sm"
                  onClick={() => {
                    setSelectedPosition(id);
                    setPositionStatus(positionStatus);
                    setModalOpen(true);
                  }}
                >
                  <span className="btn-inner--icon text-secondary">
                    <i className="fas fa-business-time" />
                  </span>
                </Button>
              </Can>
            </td>
          </tr>
        </React.Fragment>
      )
    );
  };

  const triggerDispatch = (index) => {
    switch (index) {
      case 0:
        dispatch(
          operations.fetchPositions(
            selectors.getUserId(cookie),
            selectors.userRole(cookie)
          )
        );
        break;
      case 1:
        dispatch(
          operations.fetchPositions(
            selectors.getUserId(cookie),
            selectors.userRole(cookie),
            { recruiterAssigned: selectors.getUserId(cookie) }
          )
        );
        break;
      case 2:
        dispatch(
          operations.fetchAssignedByMe({
            accHolder: selectors.getUserId(cookie),
          })
        );
        break;
      default:
        break;
    }
  };
  return (
    <div className="positions mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Positions</title>
        <meta name="description" content="Description of Positions" />
      </Helmet>
      <Row className="mt-3 mb-3 d-flex justify-content-between align-items-center">
        <Col md="6">
          <div className="ml-2">
            {["All", "Assigned to Me", "Assigned by Me"].map((title, index) => (
              <Button
                size="sm"
                key={index}
                color={filterTab == index ? "primary" : "secondary"}
                onClick={() => {
                  triggerDispatch(index);
                  setFilterTab(index);
                }}
              >
                {title}
              </Button>
            ))}
            <Button
              size="sm"
              color={showMoreFilters ? "primary" : "secondary"}
              onClick={() => {
                setShowMoreFilters((currentValue) => !currentValue);
              }}
            >
              Show more filters{" "}
              <i
                className={
                  showMoreFilters ? "fas fa-chevron-up" : "fas fa-chevron-down"
                }
              />
            </Button>
          </div>
        </Col>
        <Col className="text-right ml-auto mr-3 mr-md-5 d-flex justify-content-end">
          <Col md="3">
            <Input
              onChange={(e) => onSearchTextChanged(e)}
              type="text"
              placeholder="Enter Query"
              name="searchString"
              className="mr-3"
            />
          </Col>
          <Button
            color="primary"
            className="btn-icon btn-3"
            type="button"
            onClick={() => history.push("/add-position")}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-plus" />
            </span>
            <span className="btn-inner--text">Add Position</span>
          </Button>
        </Col>
      </Row>
      {showMoreFilters && (
        <Row className="my-3 text-sm">
          <Col md="3">
            <RtSelect
              className="basic-multi-select"
              data={availableClients}
              classNamePrefix="select"
              placeholder="Select Client"
              value={selectedClient}
              onChange={(e) => {
                setSelectedClient(e);
              }}
            />
          </Col>
          <Col md="3">
            <RtSelect
              className="basic-multi-select"
              data={availableRecruiters}
              classNamePrefix="select"
              placeholder="Select Recruiter"
              value={selectedRecruiter}
              onChange={(e) => {
                setSelectedRecruiter(e);
              }}
            />
          </Col>
          <Col md="3">
            <RtSelect
              className="basic-multi-select"
              data={availableSpocs}
              classNamePrefix="select"
              placeholder="Select Spoc"
              value={selectedSpoc}
              onChange={(e) => {
                setSelectedSpoc(e);
              }}
            />
          </Col>
        </Row>
      )}
      <div className="table-responsive">
        <Table className="align-items-center">
          <thead className="thead-light">
            <tr>
              <th scope="col">Position</th>
              <th scope="col">Client</th>
              <th scope="col">Experience (Y)</th>
              <th scope="col">Budget (LPA)</th>
              <th scope="col">Location</th>
              <th scope="col">SPOC Name</th>
              <th scope="col">Recruiter</th>
              <th scope="col">Account Holder</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{getPositionData()}</tbody>
        </Table>
      </div>
      <Modal isOpen={modalOpen} size="sm">
        <ModalHeader toggle={setModalOpen}>Change Position Status</ModalHeader>
        <ModalBody>
          <RtSelect
            className="basic-multi-select"
            data={positionStatusOptions}
            classNamePrefix="select"
            placeholder="Select Status"
            value={positionStatus}
            onChange={(e) => {
              setPositionStatus(e);
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            color="secondary"
            onClick={() => {
              setModalOpen(false);
              setSelectedPosition("");
              setPositionStatus("");
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            color="primary"
            onClick={() => {
              dispatch(
                operations.updatePosition(
                  selectedPosition,
                  {
                    positionStatus: positionStatus,
                  },
                  selectors.getUserId(cookie),
                  selectors.userRole(cookie)
                )
              );
              setSelectedPosition("");
              setPositionStatus("");
              setModalOpen(false);
            }}
          >
            Update Status
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

Positions.propTypes = {};
