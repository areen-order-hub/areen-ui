/**
 *
 * StoreForm
 *
 */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "query-string";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import { Row, Col, Button, Spinner, Form, FormGroup, Label } from "reactstrap";
import reducer from "./reducer";
import * as operations from "./actions";
import * as selectors from "./selectors";
import RtInput from "../../components/RtInput/index";
import history from "../../utils/history";
import "./storeFormStyle.scss";

export default function StoreForm() {
  useInjectReducer({ key: "storeForm", reducer });
  const dispatch = useDispatch();
  const addStoreInit = operations.addStoreInit(dispatch);

  const {
    name,
    alias,
    shopifyURL,
    apiAccessToken,
    isLoading,
    errorMessage,
    validations,
    isEdit,
  } = useSelector((state) => ({
    name: selectors.name(state),
    alias: selectors.alias(state),
    shopifyURL: selectors.shopifyURL(state),
    apiAccessToken: selectors.apiAccessToken(state),
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
    return () => addStoreInit();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const id = qs.parse(location.search).id;
      dispatch(
        operations.onEdit(id, {
          name,
          alias,
          shopifyURL,
          apiAccessToken,
        })
      );
    } else {
      dispatch(
        operations.onSubmit({
          name,
          alias,
          shopifyURL,
          apiAccessToken,
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
              {isEdit ? "Save / Edit Store" : "Add Store"}
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
          {isEdit ? "Save / Edit Store" : "Add Store"}
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
    <div className="storeForm mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>StoreForm</title>
        <meta name="description" content="Description of StoreForm" />
      </Helmet>
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <div className="text-primary font-weight-bold">
            {isEdit ? "Edit Store" : "Add a Store"}
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
              placeholder="Eg: Test Store"
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
              placeholder="Eg: TS"
              error={validations}
              name="alias"
              value={alias}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Shopify URL</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeShopifyUrl(e))}
              type="text"
              placeholder="Eg: www.mystore.shopify.net"
              error={validations}
              name="shopifyURL"
              value={shopifyURL}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>API Access Token</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeApiAccessToken(e))}
              type="text"
              placeholder="Enter Access Token"
              error={validations}
              name="apiAccessToken"
              value={apiAccessToken}
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

StoreForm.propTypes = {};
