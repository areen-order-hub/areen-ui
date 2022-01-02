/**
 *
 * Position
 *
 */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import Skeleton from "react-loading-skeleton";
import InterviewTable, {
  InterviewsTableSkeleton,
} from "../../components/InterviewTable";
import { useInjectReducer } from "utils/injectReducer";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import Tag from "components/Tag";
import RtInput from "../../components/RtInput/index";
import RtSelect from "components/RtSelect";
import ContentViewer from "components/ContentViewer";
import reducer from "./reducer";
import history from "utils/history";
import * as operations from "./actions";
import * as selectors from "./selectors";
import Can from "components/Can";
import { permissions } from "utils/permissions";
import { useCookies } from "react-cookie";
import {
  getPositionStatusBadge,
  getCandidateStatusBadge,
} from "utils/componentHelpers";
import { getCandidateStatusOptions } from "utils/hikersConstants";
import moment from "moment-timezone";
import { disablePastDates, parseDate } from "utils/dateTimeHelpers";
import { isEmpty } from "lodash";
import AddCandidate from "containers/AddCandidate";
import ScheduleInterview from "containers/ScheduleInterview";
import ReactDatetime from "react-datetime";
import "./positionStyle.scss";
import { candidateEmail } from "containers/AddCandidate/selectors";

export default function Position({ match }) {
  useInjectReducer({ key: "position", reducer });
  const dispatch = useDispatch();
  const [cookie] = useCookies(["user"]);
  const {
    positionStatus,
    receivedDate,
    jobTitle,
    department,
    reportingTo,
    reportees,
    noOfVacancies,
    minBudget,
    maxBudget,
    budgetRemarks,
    minYearsOfExperience,
    maxYearsOfExperience,
    yearsOfExperienceRemarks,
    ageRange,
    qualification,
    location,
    skillsRequired,
    targetIndustry,
    targetCompanies,
    nonPoachCompanies,
    jobDescriptionFile,
    remarks,
    clientId,
    clientName,
    clientAlias,
    clientIndustry,
    clientAbout,
    clientWebsite,
    candidateDetails,
    isCandidateDetailsLoading,
    interviews,
    isInterviewsLoading,
    addedBy,
    recruiterAssigned,
    superAccHolder,
    isLoading,
  } = useSelector((state) => ({
    positionStatus: selectors.positionStatus(state),
    receivedDate: selectors.receivedDate(state),
    jobTitle: selectors.jobTitle(state),
    department: selectors.department(state),
    reportingTo: selectors.reportingTo(state),
    reportees: selectors.reportees(state),
    noOfVacancies: selectors.noOfVacancies(state),
    minBudget: selectors.minBudget(state),
    maxBudget: selectors.maxBudget(state),
    budgetRemarks: selectors.budgetRemarks(state),
    minYearsOfExperience: selectors.minYearsOfExperience(state),
    maxYearsOfExperience: selectors.maxYearsOfExperience(state),
    yearsOfExperienceRemarks: selectors.yearsOfExperienceRemarks(state),
    ageRange: selectors.ageRange(state),
    qualification: selectors.qualification(state),
    location: selectors.location(state),
    skillsRequired: selectors.skillsRequired(state),
    targetIndustry: selectors.targetIndustry(state),
    targetCompanies: selectors.targetCompanies(state),
    nonPoachCompanies: selectors.nonPoachCompanies(state),
    jobDescriptionFile: selectors.jobDescriptionFile(state),
    remarks: selectors.remarks(state),
    clientId: selectors.clientId(state),
    clientName: selectors.clientName(state),
    clientAlias: selectors.clientAlias(state),
    clientIndustry: selectors.clientIndustry(state),
    clientAbout: selectors.clientAbout(state),
    clientWebsite: selectors.clientWebsite(state),
    candidateDetails: selectors.candidateDetails(state),
    isCandidateDetailsLoading: selectors.isCandidateDetailsLoading(state),
    interviews: selectors.interviews(state),
    isInterviewsLoading: selectors.isInterviewsLoading(state),
    addedBy: selectors.addedBy(state),
    recruiterAssigned: selectors.recruiterAssigned(state),
    superAccHolder: selectors.superAccHolder(state),
    isLoading: selectors.isLoading(state),
  }));

  const [modalOpen, setModalOpen] = useState(false);
  const [joiningDateModal, setJoiningDateModal] = useState(false);
  const [offerModal, setOfferModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [candidateRecruitmentStatus, setCandidateRecruitmentStatus] = useState(
    ""
  );
  const [candidateStatusOptions, setCandidateStatusOptions] = useState([]);

  const [candidateJoiningDate, setCandidateJoiningDate] = useState("");
  const [candidateOfferAmount, setCandidateOfferAmount] = useState("");

  const [detailsTab, setDetailsTab] = useState(0);

  React.useEffect(() => {
    const { id } = match.params;
    if (!id) {
      history.push("/positions");
    } else {
      dispatch(operations.fetchPosition(id));
      dispatch(operations.fetchCandidates(id));
      dispatch(operations.fetchInterviews(id));
    }
    return () => dispatch(operations.positionDetailsInit());
  }, []);

  const getPositionLoading = () => {
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

  const onClickCandidate = (id) =>
    history.push({
      pathname: `/candidate/${id}`,
      state: { id },
    });

  const onScheduleInterview = (candidateId) => {
    AlertPopupHandler.openCustom({
      text: "",
      data: {},
      title: "",
      warning: true,
      customClass: "text-xl",
      ChildTag: ScheduleInterview,
      ChildProps: {
        postAdd: () => {
          dispatch(operations.fetchCandidates(match.params.id));
          dispatch(operations.fetchInterviews(match.params.id));
        },
        isPopup: true,
        positionId: match.params.id,
        clientId,
        candidateId,
      },
      showConfirm: false,
      showCancel: false,
    });
  };

  const onAddCandidate = () => {
    AlertPopupHandler.openCustom({
      text: "",
      data: {},
      title: "",
      warning: true,
      customClass: "text-xl",
      ChildTag: AddCandidate,
      ChildProps: {
        postAdd: () => {
          dispatch(operations.fetchPosition(match.params.id));
          dispatch(operations.fetchCandidates(match.params.id));
        },
        isPopup: true,
        reqId: match.params.id,
        jobTitle: jobTitle,
      },
      showConfirm: false,
      showCancel: false,
    });
  };

  const onEditCandidate = (candidateId) => {
    AlertPopupHandler.openCustom({
      text: "",
      data: {},
      title: "",
      warning: true,
      customClass: "text-xl",
      ChildTag: AddCandidate,
      ChildProps: {
        postAdd: () => {
          dispatch(operations.fetchPosition(match.params.id));
          dispatch(operations.fetchCandidates(match.params.id));
        },
        id: candidateId,
        reqId: match.params.id,
        jobTitle: jobTitle,
        isPopup: true,
      },
      showConfirm: false,
      showCancel: false,
    });
  };

  const getCandidateData = () => {
    return isCandidateDetailsLoading ? (
      <tr>
        <td scope="col" colSpan="7">
          <Skeleton count={3} />
        </td>
      </tr>
    ) : (
      candidateDetails.map(
        ({
          id: candidateId,
          name,
          createdAt,
          phoneNumber,
          presentCTC,
          presentCTCRemarks,
          expectedCTC,
          expectedCTCRemarks,
          yearsOfExperience,
          presentLocation,
          fileUrl,
          recruitmentStatus,
          joiningDate,
          currentOfferAmount,
        }) => (
          <React.Fragment key={candidateId}>
            <tr>
              <td
                title={`View ${name}'s profile`}
                className="hover-pointer text-primary"
                onClick={() => onClickCandidate(candidateId)}
              >
                {name} <span>{getCandidateStatusBadge(recruitmentStatus)}</span>
              </td>
              <td>{parseDate(createdAt, "DD MMM YYYY")}</td>
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
              <td>
                <Can
                  permissions={[
                    permissions.UPDATE_A_CANDIDATE,
                    {
                      permission: permissions.UPDATE_MY_CANDIDATE,
                      value:
                        addedBy === selectors.getUserId(cookie) ||
                        recruiterAssigned === selectors.getUserId(cookie) ||
                        superAccHolder === selectors.getUserId(cookie),
                    },
                  ]}
                >
                  <Button
                    title="Edit Candidate"
                    type="button"
                    color="primary"
                    size="sm"
                    onClick={() => onEditCandidate(candidateId)}
                  >
                    <span className="btn-inner--icon">
                      <i className="fas fa-edit" />
                    </span>
                  </Button>
                </Can>
                {!isEmpty(fileUrl) && (
                  <Button
                    title="View Snapshot"
                    type="button"
                    color="info"
                    size="sm"
                    onClick={(e) => window.open(fileUrl[0], "_blank")}
                  >
                    <span className="btn-inner--icon">
                      <i className="fas fa-paperclip" />
                    </span>
                  </Button>
                )}
              </td>
              <td>
                <Button
                  title="Change Candidate Status"
                  type="button"
                  color="light"
                  size="sm"
                  onClick={() => {
                    setSelectedCandidate(candidateId);
                    setCandidateRecruitmentStatus(recruitmentStatus);
                    setCandidateStatusOptions(
                      getCandidateStatusOptions(recruitmentStatus)
                    );
                    setModalOpen(true);
                  }}
                >
                  <span className="btn-inner--icon text-secondary">
                    <i className="fas fa-business-time" />
                  </span>
                </Button>
                {[
                  "Profile Shortlisted",
                  "Shortlisted - 2nd Round",
                  "Shortlisted - 3rd Round",
                  "Shortlisted - Final Round",
                ].includes(recruitmentStatus) && (
                  <Button
                    title="Schedule Interview"
                    type="button"
                    color="primary"
                    size="sm"
                    onClick={() => onScheduleInterview(candidateId)}
                  >
                    <i className="far fa-calendar-alt" />
                  </Button>
                )}
                {[
                  "Scheduled - 1st Round",
                  "Scheduled - 2nd Round",
                  "Scheduled - 3rd Round",
                  "Scheduled - Final Round",
                ].includes(recruitmentStatus) && (
                  <Button
                    title="Send Call Letter"
                    type="button"
                    color="primary"
                    size="sm"
                    onClick={() =>
                      dispatch(
                        operations.sendCallLetter(
                          name,
                          candidateEmail,
                          recruitmentStatus,
                          candidateId,
                          clientName,
                          clientAbout,
                          clientWebsite,
                          jobTitle,
                          match.params.id
                        )
                      )
                    }
                  >
                    <i className="far fa-paper-plane" />
                  </Button>
                )}
                {recruitmentStatus === "Offered" && (
                  <>
                    <Button
                      title="Add Offered Amount"
                      type="button"
                      color="primary"
                      size="sm"
                      onClick={() => {
                        setCandidateOfferAmount(currentOfferAmount);
                        setOfferModal(true);
                      }}
                    >
                      <i className="fas fa-rupee-sign" />
                    </Button>
                    <Modal isOpen={offerModal} size="md">
                      <ModalHeader>Enter Offered Amount</ModalHeader>
                      <ModalBody>
                        <Col>
                          <RtInput
                            onChange={(e) => setCandidateOfferAmount(e)}
                            type="number"
                            placeholder="Eg. 25000, 650000"
                            value={candidateOfferAmount}
                          />
                        </Col>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          type="button"
                          color="secondary"
                          onClick={() => {
                            setOfferModal(false);
                            setCandidateOfferAmount("");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          color="primary"
                          onClick={() => {
                            dispatch(
                              operations.editCandidateDetails(
                                candidateId,
                                {
                                  currentOfferAmount: candidateOfferAmount,
                                },
                                match.params.id
                              )
                            );
                            setCandidateOfferAmount("");
                            setOfferModal(false);
                          }}
                        >
                          Update Offer Amount
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </>
                )}
                {recruitmentStatus === "Offer Accepted" && (
                  <>
                    <Button
                      title="Add Joining Date"
                      type="button"
                      color="primary"
                      size="sm"
                      onClick={() => {
                        setCandidateJoiningDate(moment(joiningDate));
                        setJoiningDateModal(true);
                      }}
                    >
                      <i className="fas fa-calendar-day" />
                    </Button>
                    <Modal isOpen={joiningDateModal} size="md">
                      <ModalHeader>Select Joining Date</ModalHeader>
                      <ModalBody>
                        <Col>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-calendar-grid-58" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <ReactDatetime
                              inputProps={{
                                placeholder: "Select Date",
                              }}
                              isValidDate={disablePastDates}
                              dateFormat="DD/MM/YYYY"
                              timeFormat={false}
                              onChange={(e) => setCandidateJoiningDate(e)}
                              value={candidateJoiningDate}
                            />
                          </InputGroup>
                        </Col>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          type="button"
                          color="secondary"
                          onClick={() => {
                            setJoiningDateModal(false);
                            setCandidateJoiningDate("");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          color="primary"
                          onClick={() => {
                            dispatch(
                              operations.editCandidateDetails(
                                candidateId,
                                {
                                  joiningDate: candidateJoiningDate.valueOf(),
                                },
                                match.params.id
                              )
                            );
                            setCandidateJoiningDate("");
                            setJoiningDateModal(false);
                          }}
                        >
                          Update Joining Date
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </>
                )}
              </td>
            </tr>
          </React.Fragment>
        )
      )
    );
  };

  const onDelete = (id, name) => {
    AlertPopupHandler.open({
      onConfirm: () => dispatch(operations.onDelete(id)),
      confirmBtnText: "Delete",
      text: (
        <>
          You are about to delete{" "}
          <span className="font-weight-bold font-italic">{name}</span>. Do you
          want to continue?
        </>
      ),
      data: {},
      warning: true,
      customClass: "text-xs",
      btnSize: "sm",
    });
  };

  const getOptions = (isOwner = false) => (
    <>
      <Col className="text-right">
        <Can
          permissions={[
            permissions.UPDATE_A_POSITION,
            {
              permission: permissions.UPDATE_MY_POSITION,
              value: isOwner,
            },
          ]}
        >
          <i
            className="far fa-edit text-muted hover-pointer hover-color-primary mr-2"
            onClick={() => history.push(`/add-position?id=${match.params.id}`)}
          />
        </Can>
        <Can
          permissions={[
            permissions.DELETE_A_POSITION,
            {
              permission: permissions.DELETE_MY_POSITION,
              value: isOwner,
            },
          ]}
        >
          <i
            className="far fa-trash-alt text-muted hover-pointer hover-color-danger"
            onClick={() => onDelete(match.params.id, jobTitle)}
          />
        </Can>
      </Col>
    </>
  );

  const getTags = (items = [], className = "", textClass = "") =>
    items.map((item) => (
      <Tag
        key={item}
        title={item}
        className={className}
        textClass={textClass}
      />
    ));

  const onClickDownload = () =>
    history.push(
      `/position-tracker/?id=${match.params.id}&jobTitle=${jobTitle}`
    );

  const getPositionComponent = () => {
    return (
      <>
        <Card>
          <CardHeader>
            <Row className="px-1">
              <Col xs="12" md="10" className="align-items-center">
                <span className="h1 mr-2 text-primary">{jobTitle}</span>
                <span>{getPositionStatusBadge(positionStatus)}</span>
              </Col>
              {getOptions(addedBy === selectors.getUserId(cookie))}
            </Row>
            <Row className="mx-1 mt-3 text-md text-muted">
              <div className="mr-3">
                <i className="far fa-building mr-1" />
                {clientAlias || clientName}
              </div>
              <div className="mr-3">
                <i className="far fa-calendar-alt mr-1" />
                {receivedDate}
              </div>
              <div className="mr-3">
                <i className="fas fa-search mr-1" />
                {noOfVacancies} Vacancies
              </div>
              {jobDescriptionFile != "" && (
                <Col className="text-right">
                  <Button
                    type="button"
                    color="link"
                    size="sm"
                    onClick={(e) => window.open(jobDescriptionFile, "_blank")}
                  >
                    <span className="btn-inner--icon">
                      <i className="fas fa-eye" />
                    </span>
                    {"  "}
                    View Job Description
                  </Button>
                </Col>
              )}
            </Row>
          </CardHeader>
          <CardHeader>
            <div className="mb-3">
              <span className="h3 text-muted">Position Details</span>
            </div>
            <p>
              <span className="text-muted">Department: </span>
              <span className="text-primary font-weight-bold">
                {department}
              </span>
            </p>
            <p>
              <span className="text-muted">Reporting To: </span>
              <span className="text-primary font-weight-bold">
                {reportingTo}
              </span>
            </p>
            <p>
              <span className="text-muted">Reportees: </span>
              <span className="text-primary font-weight-bold">{reportees}</span>
            </p>
            <p>
              <span className="text-muted">CTC Bandwidth: </span>
              <span className="text-primary font-weight-bold">
                {minBudget} - {maxBudget} LPA
              </span>
              <span className="text-mutedm ml-3">Remarks: </span>
              <span className="text-primary font-weight-bold">
                {budgetRemarks || "-"}
              </span>
            </p>
          </CardHeader>
          <CardHeader>
            <div className="mb-3">
              <span className="h3 text-muted">Candidate Positions</span>
            </div>
            <p>
              <span className="text-muted">Age Range: </span>
              <span className="text-primary font-weight-bold">{ageRange}</span>
            </p>
            <p>
              <span className="text-muted">Years Of Experience: </span>
              <span className="text-primary font-weight-bold">
                {minYearsOfExperience} - {maxYearsOfExperience}
              </span>
              <span className="text-muted ml-3">Remarks: </span>
              <span className="text-primary font-weight-bold">
                {yearsOfExperienceRemarks || "-"}
              </span>
            </p>
            <p>
              <span className="text-muted">Qualifications: </span>
              <span className="text-primary font-weight-bold">
                {qualification}
              </span>
            </p>
            <p>
              <span className="text-muted">Location: </span>
              <span className="text-primary font-weight-bold">{location}</span>
            </p>
            <p>
              <span className="text-muted">Skills Required: </span>
              <span className="text-primary font-weight-bold">
                {getTags(skillsRequired)}
              </span>
            </p>
          </CardHeader>
          <CardHeader>
            <div className="mb-3">
              <span className="h3 text-muted">Other Details</span>
            </div>
            <p>
              <span className="text-muted">Target Industry: </span>
              <span className="text-primary font-weight-bold">
                {getTags(targetIndustry)}
              </span>
            </p>
            <p>
              <span className="text-muted">Target Companies: </span>
              <span className="text-primary font-weight-bold">
                {getTags(targetCompanies)}
              </span>
            </p>
            <p>
              <span className="text-muted">Non Poach Companies: </span>
              <span className="text-primary font-weight-bold">
                {getTags(nonPoachCompanies, "border-danger", "text-danger")}
              </span>
            </p>
            <p>
              <span className="text-muted">Remarks / Notes: </span>
              <span className="text-primary font-weight-bold">
                <ContentViewer className="text-left" content={remarks} />
              </span>
            </p>
          </CardHeader>
        </Card>
        <Row>
          <Col>
            {["Candidates", "Interviews"].map((title, index) => (
              <Button
                size="sm"
                key={index}
                className="mx-0"
                color={detailsTab == index ? "primary" : "secondary"}
                onClick={() => setDetailsTab(index)}
              >
                {title}
              </Button>
            ))}
          </Col>
        </Row>
        {detailsTab == 0 ? (
          <Card>
            <CardHeader>
              <Row className="px-1 d-flex justify-content-end">
                <Col>
                  <span className="h4 text-muted">Candidate Details</span>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Can
                    permissions={[
                      permissions.ADD_A_CANDIDATE,
                      {
                        permission: permissions.ADD_MY_CANDIDATE,
                        value:
                          addedBy === selectors.getUserId(cookie) ||
                          recruiterAssigned === selectors.getUserId(cookie) ||
                          superAccHolder === selectors.getUserId(cookie),
                      },
                    ]}
                  >
                    <Button
                      size="sm"
                      color="primary"
                      className="btn-icon btn-3"
                      type="button"
                      onClick={() => onAddCandidate()}
                    >
                      <span className="btn-inner--icon">
                        <i className="fas fa-plus" />
                      </span>
                      <span className="btn-inner--text">Add Candidate</span>
                    </Button>
                  </Can>
                  <Can permissions={[permissions.DOWNLOAD_POSITION_TRACKER]}>
                    <Button
                      title="Download Tracker"
                      size="sm"
                      color="info"
                      className="btn-icon btn-3"
                      type="button"
                      onClick={() => onClickDownload()}
                    >
                      <span className="btn-inner--icon">
                        <i className="fas fa-paper-plane" />
                      </span>
                      <span className="btn-inner--text">Download Tracker</span>
                    </Button>
                  </Can>
                </Col>
              </Row>
              <div className="table-responsive">
                <Table className="mt-3 align-items-center">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Present CTC</th>
                      <th scope="col">Expected CTC</th>
                      <th scope="col">Years of Experience</th>
                      <th scope="col">Location</th>
                      <th scope="col">Candidate Actions</th>
                      <th scope="col">Recruitment Actions</th>
                    </tr>
                  </thead>
                  <tbody>{getCandidateData()}</tbody>
                </Table>
              </div>
              <Modal isOpen={modalOpen} size="sm">
                <ModalHeader>Change Candidate Recruitment Status</ModalHeader>
                <ModalBody>
                  <RtSelect
                    className="basic-multi-select"
                    data={candidateStatusOptions}
                    classNamePrefix="select"
                    placeholder="Select Status"
                    value={candidateRecruitmentStatus}
                    onChange={(e) => {
                      setCandidateRecruitmentStatus(e);
                    }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="button"
                    color="secondary"
                    onClick={() => {
                      setModalOpen(false);
                      setSelectedCandidate("");
                      setCandidateRecruitmentStatus("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    color="primary"
                    onClick={() => {
                      dispatch(
                        operations.editCandidateDetails(
                          selectedCandidate,
                          {
                            recruitmentStatus: candidateRecruitmentStatus,
                          },
                          match.params.id
                        )
                      );
                      setCandidateRecruitmentStatus("");
                      setSelectedCandidate("");
                      setModalOpen(false);
                    }}
                  >
                    Update Status
                  </Button>
                </ModalFooter>
              </Modal>
            </CardHeader>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <Row className="px-1 d-flex justify-content-between">
                <Col>
                  <span className="h4 text-muted">Interview Details</span>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              {isInterviewsLoading ? (
                <InterviewsTableSkeleton />
              ) : (
                <InterviewTable
                  interviews={interviews}
                  userRole={selectors.userRole(cookie)}
                  forPosition
                />
              )}
            </CardBody>
          </Card>
        )}
      </>
    );
  };

  return (
    <div className="position mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Position</title>
        <meta name="description" content="Description of Position" />
      </Helmet>
      <Row className="mt-4">
        <Col xs="12" md="12">
          {isLoading ? getPositionLoading() : getPositionComponent()}
        </Col>
      </Row>
    </div>
  );
}

Position.propTypes = {};
