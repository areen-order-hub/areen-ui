import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import { useInjectReducer } from "utils/injectReducer";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Button,
  Spinner,
} from "reactstrap";
import { Link } from "react-router-dom";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import RtInput from "../../components/RtInput/index";
import RtPassword from "../../components/RtPassword/index";

function ChangePassword() {
  useInjectReducer({ key: "changePasswordPage", reducer });
  const dispatch = useDispatch();
  const changePassword = operations.changePassword(dispatch);
  const changeConfirmPassword = operations.changeConfirmPassword(dispatch);
  const changePasswordInit = operations.changePasswordInit(dispatch);

  const [resetToken, setToken] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    window.location.search
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        setToken(initial.resetToken);
        setEmail(initial.email);
        return initial;
      }, {});
  }, []);

  const {
    password,
    confirmPassword,
    isLoading,
    isResetSuccess,
    errorMessage,
    validations,
  } = useSelector((state) => ({
    password: selectors.password(state),
    confirmPassword: selectors.confirmPassword(state),
    isLoading: selectors.isLoading(state),
    isResetSuccess: selectors.isResetSuccess(state),
    errorMessage: selectors.errorMessage(state),
    validations: selectors.validations(state),
  }));

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      operations.onSubmit({
        email,
        password,
        confirmPassword,
        resetToken,
      })
    );
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
          <span className="btn-inner-text">Reset</span>
        </Button>
      );
    return (
      <Button type="button" color="primary" onClick={(e) => onSubmit(e)}>
        Reset
      </Button>
    );
  };

  const getSuccessToast = () => {
    if (isResetSuccess) {
      NotificationHandler.open({
        operation: "success",
        title: "Password Changed Successfully. Please Login",
      });
    }
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
    <>
      <Container className="py-6 py-lg-8 pt-lg-9">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary">
              <CardHeader>
                <div className="text-center">
                  <h1 className="text-primary">Areen Order Hub</h1>
                </div>
              </CardHeader>
              <CardBody className="mx-md-4 mx-lg-4">
                <Form role="form" onSubmit={(e) => onSubmit(e)}>
                  <FormGroup value={password}>
                    <RtPassword
                      onChange={changePassword}
                      icon="ni-lock-circle-open"
                      type="password"
                      placeholder="New Password"
                      error={validations}
                      name="password"
                      value={password}
                    />
                  </FormGroup>
                  <FormGroup value={confirmPassword}>
                    <RtPassword
                      onChange={changeConfirmPassword}
                      icon="ni-lock-circle-open"
                      type="password"
                      placeholder="Confirm New Password"
                      error={validations}
                      name="confirmPassword"
                      value={confirmPassword}
                    />
                  </FormGroup>
                  <Row className="justify-content-center">
                    <Col xs="5">{getSubmitButton()}</Col>
                  </Row>
                  {getSuccessToast()}
                  {getErrorComponent()}
                </Form>
                <Row className="justify-content-center mt-3">
                  <div className="text-center text-xs text-muted">
                    Already have an account?{" "}
                    <Link to="/auth" onClick={changePasswordInit}>
                      Login In
                    </Link>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ChangePassword;
