import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
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

function ResetPassword() {
  useInjectReducer({ key: "resetPage", reducer });
  const dispatch = useDispatch();
  const changeEmail = operations.changeEmail(dispatch);
  const resetInit = operations.resetInit(dispatch);

  const {
    email,
    isLoading,
    errorMessage,
    successMessage,
    validations,
  } = useSelector((state) => ({
    email: selectors.email(state),
    isLoading: selectors.isLoading(state),
    errorMessage: selectors.errorMessage(state),
    successMessage: selectors.successMessage(state),
    validations: selectors.validations(state),
  }));

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      operations.onSubmit({
        email,
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
          <span className="btn-inner-text">Reset Password</span>
        </Button>
      );
    return (
      <Button type="button" color="primary" onClick={(e) => onSubmit(e)}>
        Reset Password
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

  const getSuccessComponent = () => {
    if (successMessage)
      return (
        <Row className="justify-content-center mb-1 mt-3">
          <div className="text-center text-xs text-success font-weight-bold">
            Email sent to the registered account!
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
                <Row className="mb-3">
                  <div className="text-xs text-center text-primary">
                    Enter your registered email address, mobile number or
                    username to change your account password
                  </div>
                </Row>
                <Form role="form" onSubmit={(e) => onSubmit(e)}>
                  <FormGroup className="mb-3">
                    <RtInput
                      onChange={changeEmail}
                      placeholder="Email, Username or Mobile Number"
                      type="email"
                      error={validations}
                      name="email"
                      value={email}
                    />
                  </FormGroup>
                  <Row className="justify-content-center mb-3">
                    <Col xs="6">{getSubmitButton()}</Col>
                  </Row>
                  {getErrorComponent()}
                  {getSuccessComponent()}
                  <Row className="mb-3">
                    <div className="text-xs text-center text-primary text-muted">
                      It may take several minutes to receive a password reset
                      email. Make sure to checkyour junk mail.
                    </div>
                  </Row>
                  <Row className="justify-content-center">
                    <div className="text-center text-xs text-muted">
                      Already have an account?{" "}
                      <Link to="/auth" onClick={resetInit}>
                        Login In
                      </Link>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ResetPassword;
