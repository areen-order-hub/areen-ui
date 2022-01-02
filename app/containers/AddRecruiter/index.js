/**
 *
 * AddRecruiter
 *
 */

import React from "react";
import qs from "query-string";
import { useSelector, useDispatch } from "react-redux";
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
import RtInput from "../../components/RtInput/index";
import ReactDatetime from "react-datetime";
import RtSelect from "components/RtSelect";
import reducer from "./reducer";
import * as operations from "./actions";
import * as selectors from "./selectors";
import moment from "moment-timezone";
import "./addRecruiterStyle.scss";

export default function AddRecruiter() {
  useInjectReducer({
    key: "addRecruiter",
    reducer,
  });
  const dispatch = useDispatch();
  const addRecruiterInit = operations.addRecruiterInit(dispatch);

  const {
    name,
    email,
    phoneNumber,
    role,
    designation,
    joiningDate,
    isLoading,
    errorMessage,
    validations,
    isEdit,
  } = useSelector((state) => ({
    name: selectors.name(state),
    email: selectors.email(state),
    phoneNumber: selectors.phoneNumber(state),
    role: selectors.role(state),
    designation: selectors.designation(state),
    joiningDate: selectors.joiningDate(state),
    isLoading: selectors.isLoading(state),
    errorMessage: selectors.errorMessage(state),
    validations: selectors.validations(state),
    isEdit: selectors.isEdit(state),
  }));

  React.useEffect(() => {
    const id = qs.parse(window.location.search).id;
    if (id) {
      dispatch(operations.fetchDetails(id));
    }
    return () => addRecruiterInit();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const id = qs.parse(window.location.search).id;
      dispatch(
        operations.onEdit(id, {
          name,
          email,
          phoneNumber,
          role,
          designation,
          joiningDate: moment(joiningDate).valueOf(),
        })
      );
    } else {
      dispatch(
        operations.onSubmit({
          name,
          email,
          phoneNumber,
          role,
          designation,
          joiningDate: moment(joiningDate).valueOf(),
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
            {isEdit ? "Save/Edit Recruiter" : "Add Recruiter"}
          </span>
        </Button>
      );
    return (
      <Button type="button" color="primary" onClick={(e) => onSubmit(e)}>
        {isEdit ? "Save/Edit Recruiter" : "Add Recruiter"}
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

  return (
    <div className="addRecruiter mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title> AddRecruiter </title>
        <meta name="description" content="Description of AddRecruiter" />
      </Helmet>
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <div className="text-primary font-weight-bold">
            {isEdit ? "Edit Recruiter" : "Add a Recruiter"}
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
              placeholder="Enter Name"
              error={validations}
              name="name"
              value={name}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Email</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeEmail(e))}
              type="text"
              placeholder="Enter Email"
              error={validations}
              name="email"
              value={email}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Phone Number</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changePhoneNumber(e))}
              type="text"
              placeholder="Enter Phone Number"
              error={validations}
              name="phoneNumber"
              value={phoneNumber}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Designation</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeDesignation(e))}
              type="text"
              placeholder="Enter Designation"
              error={validations}
              name="designation"
              value={designation}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Joining Date</Label>
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
                dateFormat="DD MMM YYYY"
                timeFormat={false}
                onChange={(e) => dispatch(operations.changeJoiningDate(e))}
                value={joiningDate}
              />
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Role</Label>
          <Col sm={6}>
            <RtSelect
              className="basic-multi-select"
              data={[
                { id: "recruiter", text: "Recruiter" },
                { id: "admin", text: "Admin" },
              ]}
              classNamePrefix="select"
              placeholder="Select Role"
              value={role}
              error={validations}
              onChange={(e) => dispatch(operations.changeRole(e))}
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

AddRecruiter.propTypes = {};
