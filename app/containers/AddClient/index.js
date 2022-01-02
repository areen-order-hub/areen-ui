/**
 *
 * AddClient
 *
 */

import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "query-string";
import { useDropzone } from "react-dropzone";
import { accept } from "./constants";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
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
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import RtInput from "../../components/RtInput/index";
import RtCreatableSelect from "components/RtCreatableSelect";
import RtSelect from "components/RtSelect";
import TextEditor from "components/TextEditor";
import moment from "moment-timezone";
import ReactDatetime from "react-datetime";
import isEmpty from "lodash/isEmpty";
import "./addClientStyle.scss";

export default function AddClient() {
  useInjectReducer({ key: "addClient", reducer });
  const dispatch = useDispatch();
  const addClientInit = operations.addClientInit(dispatch);

  const {
    name,
    alias,
    about,
    industry,
    officeAddress,
    officeCity,
    website,
    noOfSiteLocations,
    siteLocations,
    products,
    employeeHeadCount,
    noOfWorkingDays,
    generalShiftDetails,
    shiftBased,
    shiftDetails,
    nonPoachCompanies,
    targetCompanies,
    gstin,
    remarks,
    agreementExpiryDate,
    commercial,
    superAccHolder,
    agreementFile,
    signedUrl,
    availableUsers,
    isLoading,
    errorMessage,
    validations,
    isEdit,
  } = useSelector((state) => ({
    name: selectors.name(state),
    alias: selectors.alias(state),
    about: selectors.about(state),
    industry: selectors.industry(state),
    officeAddress: selectors.officeAddress(state),
    officeCity: selectors.officeCity(state),
    website: selectors.website(state),
    noOfSiteLocations: selectors.noOfSiteLocations(state),
    siteLocations: selectors.siteLocations(state),
    products: selectors.products(state),
    employeeHeadCount: selectors.employeeHeadCount(state),
    noOfWorkingDays: selectors.noOfWorkingDays(state),
    generalShiftDetails: selectors.generalShiftDetails(state),
    shiftBased: selectors.shiftBased(state),
    shiftDetails: selectors.shiftDetails(state),
    nonPoachCompanies: selectors.nonPoachCompanies(state),
    targetCompanies: selectors.targetCompanies(state),
    gstin: selectors.gstin(state),
    remarks: selectors.remarks(state),
    agreementExpiryDate: selectors.agreementExpiryDate(state),
    commercial: selectors.commercial(state),
    superAccHolder: selectors.superAccHolder(state),
    agreementFile: selectors.agreementFile(state),
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
    const id = qs.parse(location.search).id;
    if (id) {
      dispatch(operations.fetchDetails(id));
    }
    dispatch(operations.fetchAvailableUsers());
    return () => addClientInit();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const id = qs.parse(location.search).id;
      dispatch(
        operations.editClient(id, {
          name,
          alias,
          about,
          industry,
          officeAddress,
          officeCity,
          website,
          noOfSiteLocations,
          siteLocations,
          products,
          employeeHeadCount,
          noOfWorkingDays,
          generalShiftDetails,
          shiftBased,
          shiftDetails,
          nonPoachCompanies,
          targetCompanies,
          gstin,
          remarks,
          agreementExpiryDate,
          commercial,
          superAccHolder,
          agreementFile,
          file: acceptedFiles,
        })
      );
    } else {
      dispatch(
        operations.onSubmit({
          name,
          alias,
          about,
          industry,
          officeAddress,
          officeCity,
          website,
          noOfSiteLocations,
          siteLocations,
          products,
          employeeHeadCount,
          noOfWorkingDays,
          generalShiftDetails,
          shiftBased,
          shiftDetails,
          nonPoachCompanies,
          targetCompanies,
          gstin,
          remarks,
          agreementExpiryDate,
          commercial,
          superAccHolder,
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
            {isEdit ? "Save/Edit Client" : "Add Client"}
          </span>
        </Button>
      );
    return (
      <Button type="button" color="primary" onClick={(e) => onSubmit(e)}>
        {isEdit ? "Save/Edit Client" : "Add Client"}
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

  const getSiteLocationsInputComponent = () =>
    siteLocations.map((_, index) => (
      <FormGroup row key={index}>
        <Label sm={2}>Location {index + 1}</Label>
        <Col sm={6}>
          <TextEditor
            name={`${siteLocations[index]}`}
            theme="snow"
            placeholder={`Enter Location ${index + 1}`}
            value={siteLocations[index]}
            error={validations}
            onChange={(e) =>
              dispatch(operations.changeSiteLocations({ payload: e, index }))
            }
          />
        </Col>
      </FormGroup>
    ));

  const getShiftDetailsInputComponent = () =>
    shiftDetails.map((_, index) => (
      <React.Fragment key={index}>
        <FormGroup row>
          <Col sm={2} />
          <Label sm={1}>{`S${index + 1} - Start Time`}</Label>
          <Col sm={2}>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-watch-time" />
                </InputGroupText>
              </InputGroupAddon>
              <ReactDatetime
                inputProps={{
                  placeholder: "Select Start Time",
                }}
                dateFormat={false}
                timeFormat="hh:mm a"
                onChange={(e) =>
                  dispatch(
                    operations.changeShiftDetails({
                      index,
                      payload: { ...shiftDetails[index], startTime: e },
                    })
                  )
                }
                value={shiftDetails[index]["startTime"]}
              />
            </InputGroup>
          </Col>
          <Label sm={1}>{`S${index + 1} - End Time`}</Label>
          <Col sm={2}>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-watch-time" />
                </InputGroupText>
              </InputGroupAddon>
              <ReactDatetime
                inputProps={{
                  placeholder: "Select End Time",
                }}
                dateFormat={false}
                timeFormat="hh:mm a"
                onChange={(e) =>
                  dispatch(
                    operations.changeShiftDetails({
                      index,
                      payload: { ...shiftDetails[index], endTime: e },
                    })
                  )
                }
                value={shiftDetails[index]["endTime"]}
              />
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={2} />
          <Label sm={1}>{`S${index + 1} - Other Info`}</Label>
          <Col sm={5}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeShiftDetails({
                    index,
                    payload: { ...shiftDetails[index], additionalDetails: e },
                  })
                )
              }
              type="text"
              placeholder="Enter Additional Info"
              error={validations}
              name={`${shiftDetails[index]["additionalDetails"]}`}
              value={shiftDetails[index]["additionalDetails"]}
            />
          </Col>
        </FormGroup>
      </React.Fragment>
    ));

  const yesterday = moment().subtract(1, "day");
  const disablePastDates = (current) => {
    return current.isAfter(yesterday);
  };

  return (
    <div className="addClient mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>AddClient</title>
        <meta name="description" content="Description of AddClient" />
      </Helmet>
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <div className="text-primary font-weight-bold">
            {isEdit ? "Edit Client" : "Add a Client"}
          </div>
        </Col>
      </Row>
      <Form role="form" onSubmit={(e) => onSubmit(e)}>
        <FormGroup row>
          <Label sm={2}>Name</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeName(e))}
              type="text"
              placeholder="Enter Client Name"
              error={validations}
              name="name"
              value={name}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Alias</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeAlias(e))}
              type="text"
              placeholder="Enter Client Alias"
              error={validations}
              name="alias"
              value={alias}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>About</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeAbout(e))}
              type="textarea"
              placeholder="Enter details about the Client"
              error={validations}
              name="about"
              value={about}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Registered Address</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeAddress(e))}
              type="textarea"
              placeholder="Enter Client Registered Address"
              error={validations}
              name="officeAddress"
              value={officeAddress}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Office Location</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeCity(e))}
              type="text"
              placeholder="Enter Client Office Location"
              error={validations}
              name="officeCity"
              value={officeCity}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Industry</Label>
          <Col sm={6}>
            <RtCreatableSelect
              placeholder="Select Industry"
              name="industry"
              options={[
                { value: "Manufacturing", label: "Manufacturing" },
                { value: "IT", label: "IT" },
              ]}
              value={industry}
              isMulti
              error={validations}
              onChange={(e) => dispatch(operations.changeIndustry(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Website</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeWebsite(e))}
              type="text"
              placeholder="Enter Client Website"
              error={validations}
              name="website"
              value={website}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Number Of Locations</Label>
          <Col sm={6}>
            <RtCreatableSelect
              placeholder="Select Number Of Site Locations"
              name="noOfSiteLocations"
              options={[
                { value: "0", label: "0" },
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
              ]}
              isMulti={false}
              value={noOfSiteLocations}
              error={validations}
              onChange={(e) => dispatch(operations.changeNoOfSiteLocations(e))}
            />
          </Col>
        </FormGroup>
        {getSiteLocationsInputComponent()}
        <FormGroup row>
          <Label sm={2}>Products</Label>
          <Col sm={6}>
            <RtCreatableSelect
              placeholder="Select Products"
              name="products"
              error={validations}
              options={[
                { value: "Tyres", label: "Tyres" },
                { value: "Software", label: "Software" },
              ]}
              value={products}
              isMulti
              onChange={(e) => dispatch(operations.changeProducts(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Employee Head Count</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeEmployeeCount(e))}
              type="text"
              placeholder="Enter Client's Head Count"
              error={validations}
              name="employeeHeadCount"
              value={employeeHeadCount}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Number Of Working Days</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeNoOfWorkingDays(e))}
              type="text"
              placeholder="Enter Number Of Working Days"
              error={validations}
              name="noOfWorkingDays"
              value={noOfWorkingDays}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>General Shift Details</Label>
          <Label sm={1}>Start Time</Label>
          <Col sm={2}>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-watch-time" />
                </InputGroupText>
              </InputGroupAddon>
              <ReactDatetime
                inputProps={{
                  placeholder: "Select Start Time",
                }}
                dateFormat={false}
                timeFormat="hh:mm a"
                onChange={(e) =>
                  dispatch(
                    operations.changeGeneralShiftDetails({
                      ...generalShiftDetails,
                      startTime: e,
                    })
                  )
                }
                value={generalShiftDetails["startTime"]}
              />
            </InputGroup>
          </Col>
          <Label sm={1}>End Time</Label>
          <Col sm={2}>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-watch-time" />
                </InputGroupText>
              </InputGroupAddon>
              <ReactDatetime
                inputProps={{
                  placeholder: "Select End Time",
                }}
                dateFormat={false}
                timeFormat="hh:mm a"
                onChange={(e) =>
                  dispatch(
                    operations.changeGeneralShiftDetails({
                      ...generalShiftDetails,
                      endTime: e,
                    })
                  )
                }
                value={generalShiftDetails["endTime"]}
              />
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={2} />
          <Label sm={1}>Other Info</Label>
          <Col sm={5}>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeGeneralShiftDetails({
                    ...generalShiftDetails,
                    additionalDetails: e,
                  })
                )
              }
              type="text"
              placeholder="Enter Additional Info"
              error={validations}
              name={`${generalShiftDetails["additionalDetails"]}`}
              value={generalShiftDetails["additionalDetails"]}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Shift Based</Label>
          <Col sm={6}>
            <RtSelect
              className="basic-multi-select"
              data={[
                {
                  id: "true",
                  text: "Yes",
                },
                {
                  id: "false",
                  text: "No",
                },
              ]}
              classNamePrefix="select"
              placeholder="Shift Based?"
              value={shiftBased}
              error={validations}
              onChange={(e) => dispatch(operations.changeShiftBased(e))}
            />
          </Col>
        </FormGroup>
        {getShiftDetailsInputComponent()}
        {shiftBased == "true" && (
          <FormGroup row className="text-right">
            <Col sm={2} />
            <Col sm={6} className="text-right">
              <Button
                color="link"
                className="p-0"
                onClick={() => dispatch(operations.addNewShift())}
              >
                + Add Shift
              </Button>
            </Col>
          </FormGroup>
        )}
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
          <Label sm={2}>GSTIN</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeGSTIN(e))}
              type="text"
              placeholder="Enter GSTIN"
              error={validations}
              name="gstin"
              value={gstin}
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
            Upload Client Agreement
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
          <Label sm={2}>Agreement Expiry Date</Label>
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
                isValidDate={disablePastDates}
                dateFormat="DD/MM/YYYY"
                timeFormat={false}
                onChange={(e) =>
                  dispatch(operations.changeAgreementExpiryDate(e))
                }
                value={agreementExpiryDate}
              />
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Commercial</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeCommercial(e))}
              type="text"
              placeholder="Enter Commercial Details"
              error={validations}
              name="commercial"
              value={commercial}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Super Account Holder</Label>
          <Col sm={6}>
            <RtSelect
              className="basic-multi-select"
              data={availableUsers}
              classNamePrefix="select"
              placeholder=" Select Super Account Holder"
              value={superAccHolder}
              error={validations}
              onChange={(e) => dispatch(operations.changeSuperAccHolder(e))}
            />
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

AddClient.propTypes = {};
