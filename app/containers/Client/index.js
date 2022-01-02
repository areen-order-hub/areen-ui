/**
 *
 * Client
 *
 */

import React from "react";
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
  Badge,
} from "reactstrap";
import Skeleton from "react-loading-skeleton";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import AddSpoc from "containers/AddSpoc";
import Tag from "components/Tag";
import ContentViewer from "components/ContentViewer";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import history from "utils/history";
import { useCookies } from "react-cookie";
import * as operations from "./actions";
import * as selectors from "./selectors";
import Can from "components/Can";
import { permissions } from "utils/permissions";
import "./clientStyle.scss";
import { getPositionStatusBadge } from "utils/componentHelpers";
import { parseDate } from "utils/dateTimeHelpers";

export default function Client({ match }) {
  useInjectReducer({ key: "client", reducer });
  const dispatch = useDispatch();

  const {
    name,
    alias,
    about,
    industry,
    officeAddress,
    officeCity,
    website,
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
    noOfPositions,
    spocDetails,
    positions,
    isLoading,
  } = useSelector((state) => ({
    name: selectors.name(state),
    alias: selectors.alias(state),
    about: selectors.about(state),
    industry: selectors.industry(state),
    officeAddress: selectors.officeAddress(state),
    officeCity: selectors.officeCity(state),
    website: selectors.website(state),
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
    noOfPositions: selectors.noOfPositions(state),
    spocDetails: selectors.spocDetails(state),
    positions: selectors.positions(state),
    isLoading: selectors.isLoading(state),
  }));
  const [cookie] = useCookies(["user"]);

  React.useEffect(() => {
    const { id } = match.params;
    if (!id) {
      history.push("/clients");
    } else {
      dispatch(
        operations.fetchClient(
          id,
          selectors.userRole(cookie),
          selectors.userId(cookie)
        )
      );
      dispatch(
        operations.fetchPositions(
          selectors.userId(cookie),
          selectors.userRole(cookie),
          { clientId: id }
        )
      );
    }
    return () => dispatch(operations.clientDetailsInit());
  }, []);

  const getClientLoading = () => {
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

  const getOptions = () => (
    <>
      <Col className="text-right">
        <Can permissions={[permissions.UPDATE_A_CLIENT]}>
          <i
            className="far fa-edit text-muted hover-pointer hover-color-primary mr-2"
            onClick={() => history.push(`/add-client?id=${match.params.id}`)}
          />
        </Can>
        <Can permissions={[permissions.DELETE_A_CLIENT]}>
          <i
            className="far fa-trash-alt text-muted hover-pointer hover-color-danger"
            onClick={() => onDelete(match.params.id, name)}
          />
        </Can>
      </Col>
    </>
  );

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
            operations.fetchClient(
              match.params.id,
              selectors.userRole(cookie),
              selectors.userId(cookie)
            )
          );
        },
        isPopup: true,
        clientId: match.params.id,
      },
      showConfirm: false,
      showCancel: false,
    });
  };

  const onEditSpoc = (spocId) => {
    AlertPopupHandler.openCustom({
      text: "",
      data: {},
      title: "",
      warning: true,
      customClass: "text-sm",
      ChildTag: AddSpoc,
      ChildProps: {
        postAdd: (payload) => {
          dispatch(
            operations.fetchClient(
              match.params.id,
              selectors.userRole(cookie),
              selectors.userId(cookie)
            )
          );
        },
        spocId,
        isPopup: true,
        clientId: match.params.id,
      },
      showConfirm: false,
      showCancel: false,
    });
  };

  const onDeleteSpoc = (spocId, spocName) => {
    AlertPopupHandler.open({
      onConfirm: () =>
        dispatch(
          operations.deleteSpoc(
            spocId,
            match.params.id,
            selectors.userRole(cookie),
            selectors.userId(cookie)
          )
        ),
      confirmBtnText: "Delete",
      text: (
        <>
          You are about to delete{" "}
          <span className="font-weight-bold font-italic">{spocName}</span>. Do
          you want to continue?
        </>
      ),
      data: {},
      warning: true,
      customClass: "text-xs",
      btnSize: "sm",
    });
  };

  const getSpocOptions = (spocId, spocName) => (
    <>
      <Col className="text-right">
        <Can permissions={[permissions.UPDATE_A_SPOC]}>
          <i
            className="far fa-edit text-muted hover-pointer hover-color-primary mr-2"
            onClick={() => onEditSpoc(spocId)}
          />
        </Can>
        <Can permissions={[permissions.DELETE_A_SPOC]}>
          <i
            className="far fa-trash-alt text-muted hover-pointer hover-color-danger"
            onClick={() => onDeleteSpoc(spocId, spocName)}
          />
        </Can>
      </Col>
    </>
  );

  const getSPOCComponent = () => {
    return (
      <Card>
        <CardHeader>
          <Row className="px-1">
            <Col>
              <span className="h4 text-muted">SPOC Details:</span>
            </Col>
            <Can permissions={[permissions.ADD_A_SPOC]}>
              <Button
                size="sm"
                color="primary"
                className="btn-icon btn-3 mr-3"
                type="button"
                onClick={() => onAddSpoc()}
              >
                <span className="btn-inner--icon">
                  <i className="fas fa-plus" />
                </span>
                <span className="btn-inner--text">Add Spoc</span>
              </Button>
            </Can>
          </Row>
        </CardHeader>
        {spocDetails.map((spoc, index) => (
          <CardHeader key={index}>
            <Row className="px-1 mb-3 d-flex justify-content-between">
              <Col>
                <span className="h3 text-primary">{spoc.name}</span>
              </Col>
              {getSpocOptions(spoc.id, spoc.name)}
            </Row>
            <p>
              <span className="text-muted">Email: </span>
              <span
                className="font-weight-bold hover-pointer text-underline"
                onClick={() =>
                  window.open(`mailto:${spoc.spocEmail}`, "_blank")
                }
              >
                {spoc.spocEmail}
              </span>
            </p>
            <p>
              <span className="text-muted">Phone Number: </span>
              <span
                className="font-weight-bold hover-pointer text-underline"
                onClick={() => window.open(`tel:${spoc.phoneNumber}`, "_blank")}
              >
                {spoc.phoneNumber}
              </span>
            </p>
            <p>
              <span className="text-muted">Designation: </span>
              <span className="font-weight-bold">{spoc.designation}</span>
            </p>
            <p>
              <span className="text-muted">Office Address: </span>
              <ContentViewer
                className="text-left"
                content={spoc.officeAddress}
              />
            </p>
            <p>
              <span className="text-muted">Account Holder: </span>
              <span className="font-weight-bold">{spoc.accHolder.name}</span>
            </p>
          </CardHeader>
        ))}
      </Card>
    );
  };

  const getTags = (items = [], className = "", textClass = "") =>
    items.map((item) => (
      <Tag
        key={item}
        title={item}
        className={className}
        textClass={textClass}
      />
    ));

  const getClientComponent = () => {
    return (
      <>
        <Card>
          <CardHeader>
            <Row className="px-1">
              <Col xs="10" md="10">
                <span className="h1 text-primary">{name}</span>
              </Col>
              {getOptions()}
            </Row>
            <Row className="mx-1 mt-3 text-md text-muted">
              <div className="mr-3">
                <i className="fas fa-map-marker-alt mr-1" />
                {officeCity}
              </div>
              <div
                className="mr-3 text-underline hover-pointer"
                onClick={(e) => window.open(website, "_blank")}
              >
                <i className="fas fa-external-link-alt mr-1" />
                {website}
              </div>
              <div className="mr-3">
                <i className="fas fa-file-signature mr-1" />
                {noOfPositions} Positions
              </div>
              {agreementFile != "" && (
                <Can permissions={[permissions.VIEW_CLIENT_CONTRACTS]}>
                  <Col className="text-right">
                    <Button
                      type="button"
                      color="link"
                      size="sm"
                      onClick={(e) => window.open(agreementFile, "_blank")}
                    >
                      <span className="btn-inner--icon">
                        <i className="fas fa-eye" />
                      </span>
                      {"  "}
                      View Agreement
                    </Button>
                  </Col>
                </Can>
              )}
            </Row>
          </CardHeader>
          <CardHeader>
            <div className="mb-3">
              <span className="h4 text-muted">Company Details:</span>
            </div>
            <p>
              <span className="text-muted">Alias: </span>
              <span className="text-primary font-weight-bold">
                {alias || "-"}
              </span>
            </p>
            <p>
              <span className="text-muted">About: </span>
              <span className="text-primary font-weight-bold">{about}</span>
            </p>
            <p className="text-muted">
              Industry: {getTags(industry, "border-info", "text-info")}
            </p>
            <p className="text-muted">Products: {getTags(products)}</p>
            <p>
              <span className="text-muted">Registered Address: </span>
              <span className="text-primary font-weight-bold">
                <ContentViewer className="text-left" content={officeAddress} />
              </span>
            </p>
            {siteLocations.map((siteLocation, index) => (
              <p>
                <span className="text-muted">{`Location ${index + 1}:`} </span>
                <span className="text-primary font-weight-bold">
                  <ContentViewer className="text-left" content={siteLocation} />
                </span>
              </p>
            ))}
          </CardHeader>
          <CardHeader>
            <div className="mb-3">
              <span className="h4 text-muted">Work Details:</span>
            </div>
            <p>
              <span className="text-muted">Employee Head Count: </span>
              <span className="text-primary font-weight-bold">
                {employeeHeadCount}
              </span>
            </p>
            <p>
              <span className="text-muted">No. Of Working Days: </span>
              <span className="text-primary font-weight-bold">
                {noOfWorkingDays}
              </span>
            </p>
            <p>
              <span className="text-muted">General Shift Details: </span>
            </p>
            <div className="table-responsive">
              <Table className="my-3 align-items-center responsive table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Start Time</th>
                    <th scope="col">End Time</th>
                    <th scope="col">Additional Info</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{generalShiftDetails.startTime}</td>
                    <td>{generalShiftDetails.endTime}</td>
                    <td>{generalShiftDetails.additionalDetails}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <p>
              <span className="text-muted">Shift Based: </span>
              <span className="text-primary font-weight-bold">
                {shiftBased ? "Yes" : "No"}
              </span>
            </p>
            <p>
              <span className="text-muted">Shift Timings: </span>
            </p>
            <div className="table-responsive">
              <Table className="my-3 align-items-center responsive table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Shift No.</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">End Time</th>
                    <th scope="col">Additional Info</th>
                  </tr>
                </thead>
                <tbody>
                  {shiftDetails.map(
                    ({ startTime, endTime, additionalDetails }, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{startTime}</td>
                        <td>{endTime}</td>
                        <td>{additionalDetails}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </div>
          </CardHeader>
          <CardHeader>
            <div className="mb-3">
              <span className="h4 text-muted">Other Details:</span>
            </div>
            <p>
              <span className="text-muted">Non Poach Companies: </span>
              <span className="text-danger font-weight-bold">
                {getTags(nonPoachCompanies, "border-danger", "text-danger")}
              </span>
            </p>
            <p>
              <span className="text-muted">Target Companies: </span>
              <span className="text-primary font-weight-bold">
                {getTags(targetCompanies)}
              </span>
            </p>
            <p>
              <span className="text-muted">GSTIN: </span>
              <span className="text-primary font-weight-bold">{gstin}</span>
            </p>
            <Can permissions={[permissions.VIEW_CLIENT_CONTRACTS]}>
              <p>
                <span className="text-muted">Agreement Expiry Date: </span>
                <span className="text-primary font-weight-bold">
                  {agreementExpiryDate}
                </span>
              </p>
              <p>
                <span className="text-muted">Commerical: </span>
                <span className="text-primary font-weight-bold">
                  {commercial}
                </span>
              </p>
            </Can>
            <p>
              <span className="text-muted">Super Account Holder: </span>
              <span className="text-primary font-weight-bold">
                {superAccHolder}
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
      </>
    );
  };

  const onClickPosition = (id) =>
    history.push({
      pathname: `/position/${id}`,
      state: { id },
    });

  const getPositionData = () => {
    return positions.map(
      ({
        _id: positionId,
        jobTitle,
        receivedDate,
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
        recruiterAssigned: { name: recruiterName },
        positionStatus,
      }) => (
        <React.Fragment key={positionId}>
          <tr>
            <td
              title={`View ${jobTitle}`}
              className="hover-pointer text-primary"
              onClick={() => onClickPosition(positionId)}
            >
              {jobTitle} <span>{getPositionStatusBadge(positionStatus)}</span>{" "}
              <span>
                <Badge color="dark" className="text-secondary">
                  {parseDate(receivedDate, "DD MMM YYYY")}
                </Badge>
              </span>
            </td>
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
            <td>{spocName}</td>
            <td>{recruiterName}</td>
            <td>{accHolderName}</td>
          </tr>
        </React.Fragment>
      )
    );
  };

  return (
    <div className="client mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Client</title>
        <meta name="description" content="Description of Client" />
      </Helmet>
      <Row className="mt-4">
        <Col xs="12" md="8">
          {isLoading ? getClientLoading() : getClientComponent()}
        </Col>
        <Col>{isLoading ? getClientLoading() : getSPOCComponent()}</Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <CardHeader>
              <Row className="px-1 d-flex justify-content-between">
                <Col>
                  <span className="h4 text-muted">Positions</span>
                </Col>
                <Col className="text-right">
                  <Button
                    size="sm"
                    color="primary"
                    className="btn-icon btn-3 mr-3"
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
              <div className="table-responsive">
                <Table className="mt-3 align-items-center">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Position</th>
                      <th scope="col">Experience (Y)</th>
                      <th scope="col">Budget (LPA)</th>
                      <th scope="col">Location</th>
                      <th scope="col">SPOC Name</th>
                      <th scope="col">Recruiter</th>
                      <th scope="col">Account Holder</th>
                    </tr>
                  </thead>
                  <tbody>{getPositionData()}</tbody>
                </Table>
              </div>
            </CardHeader>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

Client.propTypes = {};
