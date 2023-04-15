/**
 *
 * RoleForm
 *
 */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "query-string";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import { get, map } from "lodash";
import {
  Row,
  Col,
  Button,
  Spinner,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import reducer from "./reducer";
import * as operations from "./actions";
import * as selectors from "./selectors";
import RtInput from "../../components/RtInput/index";
import history from "../../utils/history";
import "./roleFormStyle.scss";

export default function RoleForm() {
  useInjectReducer({ key: "roleForm", reducer });
  const dispatch = useDispatch();
  const addRoleInit = operations.addRoleInit(dispatch);
  const {
    role,
    access,
    isLoading,
    errorMessage,
    validations,
    isEdit,
  } = useSelector((state) => ({
    role: selectors.role(state),
    access: selectors.access(state),
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
    return () => addRoleInit();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const id = qs.parse(location.search).id;
      dispatch(
        operations.onEdit(id, {
          role,
          access,
        })
      );
    } else {
      dispatch(
        operations.onSubmit({
          role,
          access,
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
              {isEdit ? "Save / Edit Role" : "Add Role"}
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
          {isEdit ? "Save / Edit Role" : "Add Role"}
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
    <div className="roleForm mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Role Form</title>
        <meta name="description" content="Description of Role Form" />
      </Helmet>
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <div className="text-primary font-weight-bold">
            {isEdit ? "Edit Role" : "Add Role"}
          </div>
        </Col>
      </Row>
      <Form role="form" onSubmit={(e) => onSubmit(e)}>
        <FormGroup row>
          <Label sm={2}>Role Name</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeRole(e))}
              type="text"
              placeholder="Eg: Test User"
              error={validations}
              name="role"
              value={role}
            />
          </Col>
        </FormGroup>
        <hr />
        <Row>
          {access.map(({ moduleName, create, read, update }, index) => {
            return (
              <>
                <Col md={6}>
                  <Row className="mb-4">
                    <Col>
                      <h3>{moduleName}</h3>
                    </Col>
                  </Row>
                  <Row className="ml-3 mb-4">
                    <FormGroup check inline>
                      <Input
                        type="checkbox"
                        checked={create}
                        onChange={(e) =>
                          dispatch(
                            operations.changeAccess({
                              index,
                              payload: {
                                ...access[index],
                                create: e.target.checked,
                                read: true,
                              },
                            })
                          )
                        }
                      />
                      <Label check>Create</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        type="checkbox"
                        checked={read}
                        onChange={(e) =>
                          dispatch(
                            operations.changeAccess({
                              index,
                              payload: {
                                ...access[index],
                                read: e.target.checked,
                              },
                            })
                          )
                        }
                      />
                      <Label check>Read</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        type="checkbox"
                        checked={update}
                        onChange={(e) =>
                          dispatch(
                            operations.changeAccess({
                              index,
                              payload: {
                                ...access[index],
                                update: e.target.checked,
                                read: true,
                              },
                            })
                          )
                        }
                      />
                      <Label check>Update</Label>
                    </FormGroup>
                  </Row>
                  <hr />
                </Col>
              </>
            );
          })}
        </Row>
        <FormGroup row>
          <Col className="mt-3">{getSubmitButton()}</Col>
          <Col>{getErrorComponent()}</Col>
        </FormGroup>
      </Form>
    </div>
  );
}

RoleForm.propTypes = {};
