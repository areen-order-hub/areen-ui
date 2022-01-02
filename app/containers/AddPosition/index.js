/**
 *
 * AddPosition
 *
 */

import React, { useCallback } from "react";
import qs from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { accept } from "./constants";
import {
  Row,
  Col,
  Button,
  Spinner,
  Form,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { useInjectReducer } from "utils/injectReducer";
import moment from "moment-timezone";
import { useDropzone } from "react-dropzone";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import RtInput from "../../components/RtInput/index";
import RtSelect from "components/RtSelect";
import TextEditor from "components/TextEditor";
import { useCookies } from "react-cookie";
import RtCreatableSelect from "components/RtCreatableSelect";
import ReactDatetime from "react-datetime";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import AddSpoc from "containers/AddSpoc";
import Can from "components/Can";
import { permissions } from "utils/permissions";
import { positionStatusOptions } from "utils/hikersConstants";
import "./addPositionStyle.scss";
import isEmpty from "lodash/isEmpty";

export default function AddPosition() {
  useInjectReducer({ key: "addPosition", reducer });
  const dispatch = useDispatch();
  const addPositionInit = operations.addPositionInit(dispatch);
  const [cookie] = useCookies(["user"]);

  const {
    positionStatus,
    receivedDate,
    jobTitle,
    spocId,
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
    remarks,
    clientId,
    recruiterAssigned,
    availableClients,
    availableSpocs,
    jobDescriptionFile,
    signedUrl,
    availableUsers,
    isLoading,
    errorMessage,
    validations,
    isEdit,
  } = useSelector((state) => ({
    positionStatus: selectors.positionStatus(state),
    receivedDate: selectors.receivedDate(state),
    jobTitle: selectors.jobTitle(state),
    spocId: selectors.spocId(state),
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
    remarks: selectors.remarks(state),
    clientId: selectors.clientId(state),
    recruiterAssigned: selectors.recruiterAssigned(state),
    availableClients: selectors.availableClients(state),
    availableSpocs: selectors.availableSpocs(state),
    jobDescriptionFile: selectors.jobDescriptionFile(state),
    signedUrl: selectors.signedUrl(state),
    availableUsers: selectors.availableUsers(state),
    isLoading: selectors.isLoading(state),
    errorMessage: selectors.errorMessage(state),
    validations: selectors.validations(state),
    isEdit: selectors.isEdit(state),
  }));

  const onDrop = useCallback((acceptedFiles) => {}, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ onDrop, accept, multiple: false });

  let acceptedFileItems =
    acceptedFiles != undefined
      ? acceptedFiles.map((file, i) => <a key={file.path}>{file.path} </a>)
      : [];

  React.useEffect(() => {
    const id = qs.parse(window.location.search).id;
    if (id) {
      dispatch(operations.fetchDetails(id));
    }
    dispatch(
      operations.fetchClients(
        selectors.getUserId(cookie),
        selectors.getRole(cookie)
      )
    );
    dispatch(operations.fetchAvailableUsers());
    return () => addPositionInit();
  }, []);

  React.useEffect(() => {
    dispatch(
      operations.fetchSpocs(
        clientId,
        selectors.getUserId(cookie),
        selectors.getRole(cookie)
      )
    );
  }, [clientId]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const id = qs.parse(window.location.search).id;
      dispatch(
        operations.editPosition(id, {
          positionStatus,
          receivedDate,
          jobTitle,
          department,
          recruiterAssigned,
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
          remarks,
          clientId,
          spocId,
          jobDescriptionFile,
          file: acceptedFiles,
        })
      );
    } else {
      dispatch(
        operations.onSubmit({
          positionStatus,
          receivedDate,
          jobTitle,
          department,
          recruiterAssigned,
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
          remarks,
          clientId,
          spocId,
          file: acceptedFiles,
        })
      );
    }
  };

  const getSubmitButton = () => {
    if (isLoading)
      return (
        <Button
          type="button"
          color="primary"
          className="btn-icon"
          disabled={true}
        >
          <span className="btn-inner-icon">
            <Spinner size="sm" className="mr-2" />
          </span>
          <span className="btn-inner-text">
            {isEdit ? "Save/Edit Position" : "Add Position"}
          </span>
        </Button>
      );
    return (
      <Button type="button" color="primary" onClick={(e) => onSubmit(e)}>
        {isEdit ? "Save/Edit Position" : "Add Position"}
      </Button>
    );
  };

  const getErrorComponent = () => {
    if (errorMessage)
      return (
        <Row className="justify-content-center mb-1 mt-3">
          <div className="text-center text-xs text-warning font-weight-bold">
            {errorMessage}
          </div>
        </Row>
      );
    return null;
  };

  const yesterday = moment().subtract(1, "day");
  const disablePastDates = (current) => {
    return current.isAfter(yesterday);
  };

  const onAddSpoc = () => {
    AlertPopupHandler.openCustom({
      text: "",
      data: {},
      title: "",
      warning: true,
      customClass: "text-md",
      ChildTag: AddSpoc,
      ChildProps: {
        postAdd: (payload) => {
          dispatch(
            operations.fetchSpocs(
              clientId,
              selectors.getUserId(cookie),
              selectors.getRole(cookie)
            )
          );
        },
        isPopup: true,
        clientId,
      },
      showConfirm: false,
      showCancel: false,
    });
  };

  return (
    <div className="addPosition mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>AddPosition</title>
        <meta name="description" content="Description of AddPosition" />
      </Helmet>
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <div className="text-primary font-weight-bold">
            {isEdit ? "Edit Position" : "Add a Position"}
          </div>
        </Col>
      </Row>
      <Form role="form" onSubmit={(e) => onSubmit(e)}>
        <FormGroup row>
          <Label sm={2}>Position Status</Label>
          <Col sm={6}>
            <RtSelect
              className="basic-multi-select"
              data={positionStatusOptions}
              classNamePrefix="select"
              placeholder="Select Status"
              value={positionStatus}
              error={validations}
              onChange={(e) => {
                dispatch(operations.changePositionStatus(e));
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Received Date</Label>
          <Col sm={6}>
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
                dateFormat="DD/MM/YYYY"
                timeFormat={false}
                onChange={(e) => dispatch(operations.changeReceivedDate(e))}
                value={receivedDate}
              />
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Job Title</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeJobTitle(e))}
              type="text"
              placeholder="Enter Job Title"
              error={validations}
              name="jobTitle"
              value={jobTitle}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Client</Label>
          <Col sm={6}>
            <RtSelect
              className="basic-multi-select"
              data={availableClients}
              classNamePrefix="select"
              placeholder="Select Client"
              value={clientId}
              error={validations}
              onChange={(e) => {
                dispatch(operations.changeSpocId(""));
                dispatch(operations.changeClientId(e));
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>SPOC</Label>
          <Col sm={6}>
            <RtSelect
              className="basic-multi-select"
              data={availableSpocs}
              classNamePrefix="select"
              placeholder="Select SPOC"
              value={spocId}
              error={validations}
              onChange={(e) => dispatch(operations.changeSpocId(e))}
            />
          </Col>
          <Can permissions={[permissions.ADD_A_SPOC]}>
            <Button
              size="sm"
              color="link"
              className="btn-icon btn-3"
              type="button"
              disabled={clientId == ""}
              onClick={() => onAddSpoc()}
            >
              <span className="btn-inner--icon">
                <i className="fas fa-plus" />
              </span>
              <span className="btn-inner--text text-xs">Add Spoc</span>
            </Button>
          </Can>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Assign to Recruiter</Label>
          <Col sm={6}>
            <RtSelect
              className="basic-multi-select"
              data={availableUsers}
              classNamePrefix="select"
              placeholder="Select Recruiter"
              value={recruiterAssigned}
              error={validations}
              onChange={(e) => dispatch(operations.changeRecruiterAssigned(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Department</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeDepartment(e))}
              type="text"
              placeholder="Enter Department"
              error={validations}
              name="department"
              value={department}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Reporting To</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeReportingTo(e))}
              type="text"
              placeholder="Enter Reporting To"
              error={validations}
              name="reportingTo"
              value={reportingTo}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Reportees</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeReportees(e))}
              type="text"
              placeholder="Enter Reportees"
              error={validations}
              name="reportees"
              value={reportees}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Number Of Vacancies</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeNoOfVacancies(e))}
              type="text"
              placeholder="Enter No Of Vacancies"
              error={validations}
              name="noOfVacancies"
              value={noOfVacancies}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>CTC Details</Label>
          <Label sm={2} md="1" className="text-sm">
            Min CTC (in LPA)
          </Label>
          <Col sm={2}>
            <RtInput
              onChange={(e) => dispatch(operations.changeMinBudget(e))}
              type="text"
              placeholder="Enter 0 if no min CTC"
              error={validations}
              name="minBudget"
              value={minBudget}
            />
          </Col>
          <Label sm={1} className="text-sm">
            Max. CTC (in LPA)
          </Label>
          <Col sm={2}>
            <RtInput
              onChange={(e) => dispatch(operations.changeMaxBudget(e))}
              type="text"
              placeholder="Enter Max CTC"
              error={validations}
              name="maxBudget"
              value={maxBudget}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={2} />
          <Label sm={1} className="text-sm">
            CTC Remarks
          </Label>
          <Col sm={5}>
            <RtInput
              onChange={(e) => dispatch(operations.changeBudgetRemarks(e))}
              type="text"
              placeholder="Enter CTC Remarks"
              error={validations}
              name="budgetRemarks"
              value={budgetRemarks}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Experience Details</Label>
          <Label sm={2} md="1" className="text-sm">
            Min. Years of Experience
          </Label>
          <Col sm={2}>
            <RtInput
              onChange={(e) => dispatch(operations.changeMinYoe(e))}
              type="text"
              placeholder="Enter Min. YOE"
              error={validations}
              name="minYearsOfExperience"
              value={minYearsOfExperience}
            />
          </Col>
          <Label sm={1} className="text-sm">
            Max. Years of Experience
          </Label>
          <Col sm={2}>
            <RtInput
              onChange={(e) => dispatch(operations.changeMaxYoe(e))}
              type="text"
              placeholder="Enter Max. YOE"
              error={validations}
              name="maxYearsOfExperience"
              value={maxYearsOfExperience}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={2} />
          <Label sm={1} className="text-sm">
            Experience Remarks
          </Label>
          <Col sm={5}>
            <RtInput
              onChange={(e) => dispatch(operations.changeYoeRemarks(e))}
              type="text"
              placeholder="Enter YOE Remarks"
              error={validations}
              name="yearsOfExperienceRemarks"
              value={yearsOfExperienceRemarks}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Age Range</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeAgeRange(e))}
              type="text"
              placeholder="Enter Age Range"
              error={validations}
              name="ageRange"
              value={ageRange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Qualification</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeQualification(e))}
              type="text"
              placeholder="Enter Qualification"
              error={validations}
              name="qualification"
              value={qualification}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Location</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeLocation(e))}
              type="text"
              placeholder="Enter Location"
              error={validations}
              name="location"
              value={location}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Skills Required</Label>
          <Col sm={6}>
            <RtCreatableSelect
              placeholder="Select Skills"
              name="industry"
              options={[
                { value: "C++", label: "C++" },
                { value: "Java", label: "Java" },
              ]}
              value={skillsRequired}
              isMulti
              error={validations}
              onChange={(e) => dispatch(operations.changeSkillsRequired(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Target Industry</Label>
          <Col sm={6}>
            <RtCreatableSelect
              placeholder="Select Industry"
              name="targetIndustry"
              options={[
                { value: "Manufacturing", label: "Manufacturing" },
                { value: "IT", label: "IT" },
              ]}
              value={targetIndustry}
              isMulti
              error={validations}
              onChange={(e) => dispatch(operations.changeTargetIndustry(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Target Companies</Label>
          <Col sm={6}>
            <RtCreatableSelect
              placeholder="Select Target Companies"
              name="targetCompanies"
              options={[
                { value: "Infosys", label: "Infosys" },
                { value: "CTS", label: "CTS" },
              ]}
              value={targetCompanies}
              isMulti
              error={validations}
              onChange={(e) => dispatch(operations.changeTargetCompanies(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Non Poach Companies</Label>
          <Col sm={6}>
            <RtCreatableSelect
              placeholder="Select Non-Poach Companies"
              name="nonPoachCompanies"
              options={[
                { value: "Royal", label: "Royal" },
                { value: "Ventures", label: "Ventures" },
              ]}
              value={nonPoachCompanies}
              isMulti
              error={validations}
              onChange={(e) => dispatch(operations.changeNonPoachCompanies(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Remarks</Label>
          <Col sm={6}>
            <TextEditor
              name="remarks"
              theme="snow"
              placeholder="Enter Remarks"
              value={remarks}
              error={validations}
              onChange={(e) => dispatch(operations.changeRemarks(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>
            Upload Job Description
          </Label>
          <Col sm={6}>
            <div
              {...getRootProps({ className: "dropzone" })}
              className="dz-drag-hover dz-preview-img  dz-message dropzone"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the file here ...</p>
              ) : (
                <p>Drag and drop your file here, or click to select file.</p>
              )}
            </div>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={6}>
            <div className="text-sm">
              {!isEmpty(signedUrl) && (
                <Button
                  type="button"
                  color="info"
                  size="sm"
                  onClick={(e) => window.open(signedUrl, "_blank")}
                >
                  <span className="btn-inner--icon">
                    <i className="fas fa-paperclip" />
                  </span>{" "}
                  Show Existing File
                </Button>
              )}
              <Label for="exampleSelect" className="text-sm ml-4" sm={12}>
                {acceptedFiles.length > 0 && (
                  <>Uploaded File - {acceptedFileItems}</>
                )}
              </Label>
            </div>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col className="mt-3">{getSubmitButton()}</Col>
          <Col>{getErrorComponent()}</Col>
        </FormGroup>
      </Form>
    </div>
  );
}

AddPosition.propTypes = {};
