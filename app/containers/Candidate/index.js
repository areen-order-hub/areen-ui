/**
 *
 * Candidate
 *
 */

import React from "react";
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
import InterviewTable, {
  InterviewsTableSkeleton,
} from "../../components/InterviewTable";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import AddCandidate from "containers/AddCandidate";
import ContentViewer from "components/ContentViewer";
import Skeleton from "react-loading-skeleton";
import reducer from "./reducer";
import history from "utils/history";
import * as operations from "./actions";
import * as selectors from "./selectors";
import { useCookies } from "react-cookie";
import Can from "components/Can";
import { permissions } from "utils/permissions";
import "./candidateStyle.scss";

export default function Candidate({ match }) {
  useInjectReducer({ key: "candidate", reducer });
  const dispatch = useDispatch();
  const [cookie] = useCookies(["user"]);
  const {
    name,
    dateOfBirth,
    candidateEmail,
    gender,
    maritalStatus,
    presentLocation,
    nativeLocation,
    qualification,
    yearsOfExperience,
    presentCTC,
    presentCTCRemarks,
    expectedCTC,
    expectedCTCRemarks,
    noticePeriod,
    noticePeriodRemarks,
    experiences,
    reportingTo,
    reasonForChange,
    consultantAssessment,
    isHoldingOffer,
    existingOfferAmount,
    joiningDate,
    currentOfferAmount,
    candidateFile,
    addedBy,
    isLoading,
    isInterviewsLoading,
    interviews,
  } = useSelector((state) => ({
    name: selectors.name(state),
    dateOfBirth: selectors.dateOfBirth(state),
    candidateEmail: selectors.candidateEmail(state),
    gender: selectors.gender(state),
    maritalStatus: selectors.maritalStatus(state),
    presentLocation: selectors.presentLocation(state),
    nativeLocation: selectors.nativeLocation(state),
    qualification: selectors.qualification(state),
    yearsOfExperience: selectors.yearsOfExperience(state),
    presentCTC: selectors.presentCTC(state),
    presentCTCRemarks: selectors.presentCTCRemarks(state),
    expectedCTC: selectors.expectedCTC(state),
    expectedCTCRemarks: selectors.expectedCTCRemarks(state),
    noticePeriod: selectors.noticePeriod(state),
    noticePeriodRemarks: selectors.noticePeriodRemarks(state),
    experiences: selectors.experiences(state),
    reportingTo: selectors.reportingTo(state),
    reasonForChange: selectors.reasonForChange(state),
    consultantAssessment: selectors.consultantAssessment(state),
    isHoldingOffer: selectors.isHoldingOffer(state),
    existingOfferAmount: selectors.existingOfferAmount(state),
    joiningDate: selectors.joiningDate(state),
    currentOfferAmount: selectors.currentOfferAmount(state),
    candidateFile: selectors.candidateFile(state),
    addedBy: selectors.addedBy(state),
    isLoading: selectors.isLoading(state),
    isInterviewsLoading: selectors.isInterviewsLoading(state),
    interviews: selectors.interviews(state),
  }));

  React.useEffect(() => {
    const { id } = match.params;
    if (!id) {
      history.push("/candidates");
    } else {
      dispatch(operations.fetchCandidate(id));
      dispatch(operations.fetchInterviews(id));
    }
    return () => dispatch(operations.candidateDetailsInit());
  }, []);

  const getCandidateLoading = () => {
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

  const onEdit = (candidateId) => {
    AlertPopupHandler.openCustom({
      text: "",
      data: {},
      title: "",
      warning: true,
      customClass: "text-xl",
      ChildTag: AddCandidate,
      ChildProps: {
        postAdd: () => {
          dispatch(operations.fetchCandidate(candidateId));
        },
        id: candidateId,
        isPopup: true,
      },
      showConfirm: false,
      showCancel: false,
    });
  };

  const getOptions = (isOwner = false) => (
    <>
      <Col className="text-right">
        {/* <Can
          permissions={[
            permissions.UPDATE_A_CANDIDATE,
            {
              permission: permissions.UPDATE_MY_CANDIDATE,
              value: isOwner,
            },
          ]}
        >
          <i
            className="far fa-edit text-muted hover-pointer hover-color-primary mr-2"
            onClick={() => onEdit(match.params.id)}
          />
        </Can> */}
        <Can
          permissions={[
            permissions.DELETE_A_CANDIDATE,
            {
              permission: permissions.DELETE_MY_CANDIDATE,
              value: isOwner,
            },
          ]}
        >
          <i
            className="far fa-trash-alt text-muted hover-pointer hover-color-danger"
            onClick={() => onDelete(match.params.id, name)}
          />
        </Can>
      </Col>
    </>
  );

  const getCandidateComponent = () => {
    return (
      <>
        <Card>
          <CardHeader>
            <Row className="px-1">
              <Col xs="12" md="10">
                <span className="h1 text-primary">{name}</span>
              </Col>
              {getOptions(addedBy === selectors.getUserId(cookie))}
            </Row>
            <Row className="mx-1 mt-3 text-md text-muted d-flex justify-content-end">
              <Col>
                <Row>
                  <div className="mr-3">
                    <i className="far fa-calendar-alt mr-1" />
                    {dateOfBirth}
                  </div>

                  <div className="mr-3">
                    <i className="far fa-envelope-open mr-1" />
                    {candidateEmail}
                  </div>

                  <div className="mr-3">
                    <i
                      className={
                        gender === "Male"
                          ? "fas fa-mars mr-1"
                          : "fas fa-venus mr-1"
                      }
                    />
                    {gender}
                  </div>
                </Row>
              </Col>
              <Col className="text-right">
                <Button
                  type="button"
                  color="link"
                  size="sm"
                  onClick={(e) => window.open(candidateFile, "_blank")}
                >
                  <span className="btn-inner--icon">
                    <i className="fas fa-eye" />
                  </span>
                  {"  "}
                  View Snapshot
                </Button>
              </Col>
            </Row>
          </CardHeader>

          <CardHeader>
            <div className="mb-3">
              <span className="h4 text-muted">Personal Details: </span>
            </div>
            <p>
              <span className="text-muted">Marital Status: </span>
              <span className="text-primary font-weight-bold">
                {maritalStatus}
              </span>
            </p>
            <p>
              <span className="text-muted">Present Location: </span>
              <span className="text-primary font-weight-bold">
                {presentLocation}
              </span>
            </p>
            <p>
              <span className="text-muted">Native Location: </span>
              <span className="text-primary font-weight-bold">
                {nativeLocation}
              </span>
            </p>
          </CardHeader>
          <CardHeader>
            <div className="mb-3">
              <span className="h4 text-muted">Professional Details: </span>
            </div>
            <p>
              <span className="text-muted">Qualification: </span>
            </p>
            <div className="table-responsive">
              <Table className="my-3 align-items-center responsive table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Degree</th>
                    <th scope="col">Institution</th>
                    <th scope="col">Percentage</th>
                    <th scope="col">Passed Out Year</th>
                  </tr>
                </thead>
                <tbody>
                  {qualification.map(
                    ({ degree, institution, percentage, passedOutYear }) => (
                      <tr>
                        <td>{degree || "-"}</td>
                        <td>{institution || "-"}</td>
                        <td>{percentage || "-"}</td>
                        <td>{passedOutYear || "-"}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </div>
            <p>
              <span className="text-muted">Years of Experience: </span>
              <span className="text-primary font-weight-bold">
                {`${yearsOfExperience.split(".")[0]} years ${
                  yearsOfExperience.split(".")[1]
                } months`}
              </span>
            </p>
            <p>
              <span className="text-muted">Present CTC: </span>
              <span className="text-primary font-weight-bold">
                {presentCTC} {presentCTCRemarks}
              </span>
            </p>
            <p>
              <span className="text-muted">Expected CTC: </span>
              <span className="text-primary font-weight-bold">
                {expectedCTC} {expectedCTCRemarks}
              </span>
            </p>
            <p>
              <span className="text-muted">Notice Period (in days): </span>
              <span className="text-primary font-weight-bold">
                {noticePeriod} {noticePeriodRemarks}
              </span>
            </p>
            <p>
              <span className="text-muted">Experiences: </span>
            </p>
            <div className="table-responsive">
              <Table className="my-3 align-items-center responsive table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Company Name</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Employment Period</th>
                  </tr>
                </thead>
                <tbody>
                  {experiences.map(
                    ({ companyName, designation, employmentPeriod }) => (
                      <tr>
                        <td>{companyName}</td>
                        <td>{designation}</td>
                        <td>{employmentPeriod}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </div>
            <p>
              <span className="text-muted">Reporting To: </span>
              <span className="text-primary font-weight-bold">
                {reportingTo}
              </span>
            </p>
          </CardHeader>
          <CardHeader>
            <div className="mb-3">
              <span className="h4 text-muted">Existing Offer Details: </span>
            </div>
            <p className="text-muted">
              <span className="text-muted">Is Holding Offer: </span>
              <span className="text-primary font-weight-bold">
                {isHoldingOffer}
              </span>
            </p>
            <p className="text-muted">
              <span className="text-muted">Existing Offer Amount: </span>
              <span className="text-primary font-weight-bold">
                {existingOfferAmount}
              </span>
            </p>
          </CardHeader>
          <CardHeader>
            <div className="mb-3">
              <span className="h4 text-muted">Current Offer Details: </span>
            </div>
            <p className="text-muted">
              <span className="text-muted">Joining Date: </span>
              <span className="text-primary font-weight-bold">
                {joiningDate}
              </span>
            </p>
            <p className="text-muted">
              <span className="text-muted">Current Offer Amount: </span>
              <span className="text-primary font-weight-bold">
                {currentOfferAmount}
              </span>
            </p>
          </CardHeader>
          <CardHeader>
            <div className="mb-3">
              <span className="h4 text-muted">Other Details: </span>
            </div>
            <p className="text-muted">
              <span className="text-muted">Reason For Change: </span>
              <span className="text-primary font-weight-bold">
                {reasonForChange}
              </span>
            </p>
            <p className="text-muted">
              <span className="text-muted">Consultant Assessment: </span>
              <span className="text-primary font-weight-bold">
                <ul>
                  {consultantAssessment.map((assessment, index) => (
                    <li key={index}>{assessment}</li>
                  ))}
                </ul>
              </span>
            </p>
          </CardHeader>
        </Card>
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
                forCandidate
              />
            )}
          </CardBody>
        </Card>
      </>
    );
  };

  return (
    <div className="candidate mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Candidate</title>
        <meta name="description" content="Description of Candidate" />
      </Helmet>
      <Row className="mt-4">
        <Col xs="12" md="11">
          {isLoading ? getCandidateLoading() : getCandidateComponent()}
        </Col>
      </Row>
    </div>
  );
}

Candidate.propTypes = {};
