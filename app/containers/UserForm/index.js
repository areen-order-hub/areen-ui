/**
 *
 * UserForm
 *
 */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "query-string";
import { useCookies } from "react-cookie";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import { get } from "lodash";
import { Row, Col, Button, Spinner, Form, FormGroup, Label } from "reactstrap";
import reducer from "./reducer";
import * as operations from "./actions";
import * as selectors from "./selectors";
import RtInput from "../../components/RtInput/index";
import history from "../../utils/history";
import "./userFormStyle.scss";

export default function UserForm() {
  useInjectReducer({ key: "userForm", reducer });
  const dispatch = useDispatch();
  const addUserInit = operations.addUserInit(dispatch);
  const [cookie] = useCookies(["user"]);

  const {
    name,
    email,
    isLoading,
    errorMessage,
    validations,
    isEdit,
  } = useSelector((state) => ({
    name: selectors.name(state),
    email: selectors.email(state),
    isLoading: selectors.isLoading(state),
    errorMessage: selectors.errorMessage(state),
    validations: selectors.validations(state),
    isEdit: selectors.isEdit(state),
  }));

  useEffect(() => {
    const id = qs.parse(location.search).id;
    if (id) {
      dispatch(operations.fetchDetails(id));
    }
    return () => addUserInit();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const id = qs.parse(location.search).id;
      dispatch(
        operations.onEdit(id, {
          name,
          email,
          orgId: get(cookie, "user.orgId", ""),
        })
      );
    } else {
      dispatch(
        operations.onSubmit({
          name,
          email,
          orgId: get(cookie, "user.orgId", ""),
        })
      );
    }
  };

  const getSubmitButton = () => {
    if (isLoading)
      return (
        <>
          <Button type="button" color="primary" className="btn-icon" disabled>
            <span className="btn-inner-icon">
              <Spinner size="sm" className="mr-2" />
            </span>
            <span className="btn-inner-text">
              {isEdit ? "Save / Edit User" : "Invite User"}
            </span>
          </Button>
          <Button type="button" color="secondary" disabled>
            Cancel
          </Button>
        </>
      );
    return (
      <>
        <Button type="button" color="primary" onClick={(e) => onSubmit(e)}>
          {isEdit ? "Save / Edit User" : "Invite User"}
        </Button>
        <Button
          type="button"
          color="secondary"
          onClick={() => history.goBack()}
        >
          Cancel
        </Button>
      </>
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
    <div className="userForm mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>UserForm</title>
        <meta name="description" content="Description of UserForm" />
      </Helmet>
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <div className="text-primary font-weight-bold">
            {isEdit ? "Edit User" : "Invite a User"}
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
              placeholder="Eg: Test User"
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
              placeholder="Eg: test@gmail.com"
              error={validations}
              name="email"
              value={email}
            />
          </Col>
        </FormGroup>{" "}
        <FormGroup row>
          <Col className="mt-3">{getSubmitButton()}</Col>
          <Col>{getErrorComponent()}</Col>
        </FormGroup>
      </Form>
    </div>
  );
}

UserForm.propTypes = {};
