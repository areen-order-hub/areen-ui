import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInjectReducer } from "utils/injectReducer";
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
import "./loginStyle.scss";

function Login() {
  useInjectReducer({ key: "loginPage", reducer });
  const dispatch = useDispatch();
  const changeEmail = operations.changeEmail(dispatch);
  const changePassword = operations.changePassword(dispatch);
  const loginInit = operations.loginInit(dispatch);

  const { email, password, isLoading, errorMessage, validations } = useSelector(
    (state) => ({
      email: selectors.email(state),
      password: selectors.password(state),
      isLoading: selectors.isLoading(state),
      errorMessage: selectors.errorMessage(state),
      validations: selectors.validations(state),
    })
  );

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      operations.onSubmit({
        email,
        password,
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
          <span className="btn-inner-text">Login</span>
        </Button>
      );
    return (
      <Button type="button" color="primary" onClick={(e) => onSubmit(e)}>
        Login
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
    <>
      <Container className="py-6 py-lg-8 pt-lg-9 login">
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
                  <FormGroup className="mb-3" value={email}>
                    <RtInput
                      onChange={changeEmail}
                      icon="ni-email-83"
                      type="email"
                      placeholder="Email Address"
                      error={validations}
                      name="email"
                      value={email}
                    />
                  </FormGroup>
                  <FormGroup value={password}>
                    <RtPassword
                      onChange={changePassword}
                      icon="ni-lock-circle-open"
                      type="password"
                      placeholder="Password"
                      error={validations}
                      name="password"
                      value={password}
                    />
                  </FormGroup>
                  <Row>
                    <Col xs="6">{getSubmitButton()}</Col>
                    {/* <Col className="text-right" xs="6">
                      <Link
                        to="/auth/resetpassword"
                        className="text-xs"
                        onClick={loginInit}
                      >
                        Forgot Password?
                      </Link>
                    </Col> */}
                  </Row>
                  {getErrorComponent()}
                  {/* <Row className="justify-content-center">
                    <Col xs="4">
                      <hr />
                    </Col>
                    <Col xs="4" className="text-center text-muted mt-3">
                      or
                    </Col>
                    <Col xs="4">
                      <hr />
                    </Col>
                  </Row> */}
                </Form>
                {/* <Row className="justify-content-center">
                  <div className="text-muted text-xs">
                    New User?{" "}
                    <Link to="/auth/register" onClick={loginInit}>
                      Signup now
                    </Link>
                  </div>
                </Row> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
