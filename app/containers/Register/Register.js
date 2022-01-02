import React from "react";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useInjectReducer } from "utils/injectReducer";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Button,
  Spinner,
} from "reactstrap";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import RtInput from "../../components/RtInput/index";
import RtPassword from "../../components/RtPassword/index";

function Register() {
  useInjectReducer({ key: "registerPage", reducer });
  const dispatch = useDispatch();
  const changeName = operations.changeName(dispatch);
  const changeEmail = operations.changeEmail(dispatch);
  const changePassword = operations.changePassword(dispatch);
  const changeOrgName = operations.changeOrgName(dispatch);
  const registerInit = operations.registerInit(dispatch);
  const toggleEmailVerify = operations.toggleEmailVerify(dispatch);
  const changeEmailCode = operations.changeEmailCode(dispatch);

  const {
    name,
    email,
    password,
    orgName,
    isLoading,
    errorMessage,
    validations,
    showEmailVerification,
    emailCode,
  } = useSelector((state) => ({
    name: selectors.fullname(state),
    email: selectors.email(state),
    password: selectors.password(state),
    orgName: selectors.orgName(state),
    isLoading: selectors.isLoading(state),
    errorMessage: selectors.errorMessage(state),
    validations: selectors.validations(state),
    showEmailVerification: selectors.showEmailVerification(state),
    emailCode: selectors.emailCode(state),
  }));

  const disableResendCode = useSelector((state) =>
    selectors.disableResendCode(state)
  );

  const onSubmit = (e) => {
    e.preventDefault();
    return dispatch(
      operations.onSubmit({
        name,
        email,
        password,
        orgName,
      })
    );
  };

  const onVerify = (e) => {
    e.preventDefault();

    return dispatch(
      operations.verifyCode({
        email,
        code: emailCode,
      })
    );
  };
  const getSubmitButton = (buttonText, onClick) => {
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
          <span className="btn-inner-text">{buttonText}</span>
        </Button>
      );
    return (
      <Button type="button" color="primary" onClick={(e) => onClick(e)}>
        {buttonText}
      </Button>
    );
  };

  const getEmailVerification = () => {
    return (
      <div>
        <Row className="mb-3 justify-content-center">
          <div className="text-xs text-center text-primary">
            We have sent an OTP to your registered email address, Kindly enter
            it to verify your login attempt
          </div>
        </Row>
        <Form className="mb-4" onSubmit={(e) => onVerify(e)}>
          <FormGroup className="mb-3 px-4">
            <RtInput
              onChange={changeEmailCode}
              type="text"
              placeholder="Verification Code"
              name="code"
              error={validations}
              value={emailCode}
              className="text-center text-primary text-bold"
            />
          </FormGroup>
          <Row className="justify-content-center mb-3">
            {getSubmitButton("Continue", onVerify)}
          </Row>
          {getErrorComponent()}
        </Form>
        <Row className="mb-3 justify-content-center">
          <div className="text-xs text-center text-muted">
            <div>Didn't receive the verification code yet?</div>
            <Button
              className="ml-2 pl-0"
              size="sm"
              color="link"
              onClick={() => dispatch(operations.resendCode(email))}
              disabled={disableResendCode}
            >
              Resend Code
            </Button>
          </div>
        </Row>
      </div>
    );
  };

  const getErrorComponent = () => {
    if (errorMessage)
      return (
        <Row className="justify-content-center mb-3">
          <div className="text-center text-xs text-warning font-weight-bold">
            {errorMessage}
          </div>
        </Row>
      );
    return null;
  };

  const getRegisterForm = () => (
    <>
      <Form onSubmit={(e) => onSubmit(e)}>
        <FormGroup className="mb-3" value={name}>
          <RtInput
            onChange={changeName}
            icon="ni-single-02"
            type="text"
            placeholder="Full Name"
            error={validations}
            name="name"
            value={name}
          />
        </FormGroup>
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
        <FormGroup className="mb-3" value={password}>
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
        <FormGroup className="mb-3" value={orgName}>
          <RtInput
            onChange={changeOrgName}
            icon="ni-building"
            type="text"
            placeholder="Eg. Google, Microsoft"
            error={validations}
            name="orgName"
            value={orgName}
          />
        </FormGroup>
        <Row className="justify-content-center mb-3">
          {getSubmitButton("Signup", onSubmit)}
        </Row>
        {getErrorComponent()}
        <Row className="justify-content-center mb-4">
          <div className="text-center text-xs text-muted">
            By signing up, I agree to Areen Order Hub's{" "}
            <Link to="/auth/terms" target="_blank">
              Terms of service
            </Link>{" "}
            and{" "}
            <Link to="/auth/privacy" target="_blank">
              Privacy Policy
            </Link>
            .
          </div>
        </Row>
        <Row className="justify-content-center">
          <div className="text-center text-xs text-muted">
            Already have an account?{" "}
            <Link to="/auth" onClick={registerInit}>
              Login In
            </Link>
          </div>
        </Row>
      </Form>
    </>
  );

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
                {showEmailVerification
                  ? getEmailVerification()
                  : getRegisterForm()}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
