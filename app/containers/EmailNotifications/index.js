/**
 *
 * EmailNotifications
 *
 */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import { Row, Col, Button, Spinner, Form, FormGroup, Label } from "reactstrap";
import RtCreatableSelect from "components/RtCreatableSelect";
import { get, isEqual, map } from "lodash";
import reducer from "./reducer";
import * as operations from "./actions";
import * as selectors from "./selectors";
import "./emailNotificationsStyle.scss";

export default function EmailNotifications() {
  useInjectReducer({ key: "emailNotifications", reducer });
  const dispatch = useDispatch();
  const {
    configId,
    orderComments,
    notDeliveredOrders,
    notInvoicedOrders,
    existingConfig,
    isLoading,
    validations,
  } = useSelector((state) => ({
    configId: selectors.configId(state),
    orderComments: selectors.orderComments(state),
    notDeliveredOrders: selectors.notDeliveredOrders(state),
    notInvoicedOrders: selectors.notInvoicedOrders(state),
    existingConfig: selectors.existingConfig(state),
    isLoading: selectors.isLoading(state),
    validations: selectors.validations(state),
  }));

  useEffect(() => {
    dispatch(operations.fetchEmailNotificationConfig());
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      operations.patchEmailNotificationConfig(configId, {
        orderComments: map(orderComments, ({ value }) => value),
        notDeliveredOrders: map(notDeliveredOrders, ({ value }) => value),
        notInvoicedOrders: map(notInvoicedOrders, ({ value }) => value),
      })
    );
  };

  const getSubmitButton = () => {
    if (isLoading)
      return (
        <>
          <Button type="button" color="primary" className="btn-icon" disabled>
            <span className="btn-inner-icon">
              <Spinner size="sm" className="mr-2" />
            </span>
            <span className="btn-inner-text">Save</span>
          </Button>
        </>
      );
    return (
      <>
        {console.log(
          "Boolean Check",
          isEqual(
            map(orderComments, ({ value }) => value),
            get(existingConfig, "orderComments", [])
          ) &&
            isEqual(
              map(notDeliveredOrders, ({ value }) => value),
              get(existingConfig, "notDeliveredOrders", [])
            ) &&
            isEqual(
              map(notInvoicedOrders, ({ value }) => value),
              get(existingConfig, "notInvoicedOrders", [])
            )
        )}
        <Button
          type="button"
          color="primary"
          disabled={
            isEqual(
              map(orderComments, ({ value }) => value),
              get(existingConfig, "orderComments", [])
            ) &&
            isEqual(
              map(notDeliveredOrders, ({ value }) => value),
              get(existingConfig, "notDeliveredOrders", [])
            ) &&
            isEqual(
              map(notInvoicedOrders, ({ value }) => value),
              get(existingConfig, "notInvoicedOrders", [])
            )
          }
          onClick={(e) => onSubmit(e)}
        >
          Save
        </Button>
      </>
    );
  };

  return (
    <div className="emailNotifications mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>EmailNotifications</title>
        <meta name="description" content="Description of EmailNotifications" />
      </Helmet>
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <div className="text-primary font-weight-bold">
            Update Emails for Notifications
          </div>
        </Col>
      </Row>
      <Form role="form" onSubmit={(e) => onSubmit(e)}>
        <FormGroup row>
          <Label sm={2}>Order Comments</Label>
          <Col sm={6}>
            <RtCreatableSelect
              placeholder="Enter email Ids"
              name="orderComments"
              isMulti
              value={orderComments}
              onChange={(e) =>
                dispatch(operations.updateOrderCommentsEmails(e))
              }
              error={validations}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Order not Delivered</Label>
          <Col sm={6}>
            <RtCreatableSelect
              placeholder="Enter email Ids"
              name="notDeliveredOrders"
              isMulti
              value={notDeliveredOrders}
              onChange={(e) =>
                dispatch(operations.updateOrderNotDeliveredEmails(e))
              }
              error={validations}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Invoice not Created</Label>
          <Col sm={6}>
            <RtCreatableSelect
              placeholder="Enter email Ids"
              name="notInvoicedOrders"
              isMulti
              value={notInvoicedOrders}
              onChange={(e) =>
                dispatch(operations.updateOrderNotInvoicedEmails(e))
              }
              error={validations}
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

EmailNotifications.propTypes = {};
