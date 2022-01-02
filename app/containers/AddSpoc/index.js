/**
 *
 * AddSpoc
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col, Form, FormGroup, Label, Button, Spinner } from "reactstrap";
import RtInput from "../../components/RtInput/index";
import RtReactSelect from "components/RtReactSelect";
import TextEditor from "components/TextEditor";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import * as operations from "./actions";
import * as selectors from "./selectors";
import "./addSpocStyle.scss";

export default function AddSpoc({
  spocId,
  clientId,
  postAdd = () => ({}),
  onConfirm = () => console.log(""),
  onCancel = () => console.log(""),
  isPopup = false,
}) {
  useInjectReducer({ key: "addSpoc", reducer });
  const dispatch = useDispatch();
  const {
    name,
    spocEmail,
    phoneNumber,
    designation,
    officeAddress,
    accHolder,
    availableUsers,
    isLoading,
    errorMessage,
    validations,
    isEdit,
  } = useSelector((state) => ({
    name: selectors.name(state),
    spocEmail: selectors.spocEmail(state),
    phoneNumber: selectors.phoneNumber(state),
    designation: selectors.designation(state),
    officeAddress: selectors.officeAddress(state),
    accHolder: selectors.accHolder(state),
    availableUsers: selectors.availableUsers(state),
    isLoading: selectors.isLoading(state),
    errorMessage: selectors.errorMessage(state),
    validations: selectors.validations(state),
    isEdit: selectors.isEdit(state),
  }));

  React.useEffect(() => {
    if (spocId) {
      dispatch(operations.fetchSpoc(spocId));
    } else {
      dispatch(operations.initPage());
    }
    dispatch(operations.fetchAvailableUsers());
    return () => dispatch(operations.initPage());
  }, []);

  const onSubmit = () => {
    if (isEdit) {
      dispatch(
        operations.onEdit(
          spocId,
          {
            name,
            spocEmail,
            phoneNumber,
            designation,
            officeAddress,
            clientId,
            accHolder: accHolder.value,
          },
          postAdd,
          onConfirm
        )
      );
    } else {
      dispatch(
        operations.onSubmit(
          {
            name,
            spocEmail,
            phoneNumber,
            designation,
            officeAddress,
            clientId,
            accHolder: accHolder.value,
          },
          postAdd,
          onConfirm
        )
      );
    }
  };

  const getSubmitButton = () => {
    if (isLoading)
      return (
        <>
          <Button type="default" size={isPopup ? "sm" : "md"} disabled={true}>
            Cancel
          </Button>
          <Button
            type="button"
            color="primary"
            className="btn-icon"
            disabled={true}
            size={isPopup ? "sm" : "md"}
          >
            <span className="btn-inner-icon">
              <Spinner size="sm" className="mr-2" />
            </span>
            <span className="btn-inner-text">
              {isEdit ? "Save/Edit SPOC" : "Add SPOC"}
            </span>
          </Button>
        </>
      );
    return (
      <>
        <Button
          type="default"
          size={isPopup ? "sm" : "md"}
          onClick={() => onCancel()}
        >
          Cancel
        </Button>
        <Button
          type="button"
          color="primary"
          size={isPopup ? "sm" : "md"}
          className="align-items-right"
          onClick={(e) => onSubmit(e)}
        >
          {isEdit ? "Save/Edit SPOC" : "Add SPOC"}
        </Button>
      </>
    );
  };

  return (
    <div className="addSpoc">
      <Helmet>
        <title>AddSpoc</title>
        <meta name="description" content="Description of AddSpoc" />
      </Helmet>
      <Row className="my-3">
        <Col xs="12">
          <div className="text-primary text-left font-weight-bold">
            {isEdit ? "Edit a SPOC" : "Add a SPOC"}
          </div>
        </Col>
      </Row>
      <Form role="form" onSubmit={(e) => onSubmit(e)}>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Name
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changeName(e))}
              type="text"
              placeholder="Enter SPOC Name"
              error={validations}
              name="name"
              value={name}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Email
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changeEmail(e))}
              type="text"
              placeholder="Enter SPOC Email"
              error={validations}
              name="spocEmail"
              value={spocEmail}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Phone Number
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changePhone(e))}
              type="text"
              placeholder="Enter SPOC Phone Number"
              error={validations}
              name="phoneNumber"
              value={phoneNumber}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Designation
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changeDesignation(e))}
              type="text"
              placeholder="Enter SPOC Designation"
              error={validations}
              name="designation"
              value={designation}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Office Address
          </Label>
          <Col>
            <TextEditor
              name="officeAddress"
              theme="snow"
              placeholder="Enter SPOC Office Address"
              value={officeAddress}
              error={validations}
              onChange={(e) => dispatch(operations.changeOfficeAddress(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Account Holder
          </Label>
          <Col>
            <RtReactSelect
              className="basic-multi-select"
              options={availableUsers}
              classNamePrefix="select"
              placeholder=" Select Account Holder"
              value={accHolder}
              isMulti={false}
              error={validations}
              onChange={(e) => dispatch(operations.changeAccHolder(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col className="mt-3">{getSubmitButton()}</Col>
        </FormGroup>
      </Form>
    </div>
  );
}

AddSpoc.propTypes = {};
