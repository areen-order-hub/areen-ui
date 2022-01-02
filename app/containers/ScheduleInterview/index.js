/**
 *
 * ScheduleInterview
 *
 */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import cs from "classnames";
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
import RtInput from "components/RtInput/index";
import RtReactSelect from "components/RtReactSelect";
import TextEditor from "components/TextEditor/index";
import moment from "moment-timezone";
import ReactDatetime from "react-datetime";
import * as operations from "./actions";
import * as selectors from "./selectors";
import "./scheduleInterviewStyle.scss";

export default function ScheduleInterview({
  positionId,
  clientId,
  candidateId,
  postAdd = () => ({}),
  onConfirm = () => ({}),
  onCancel = () => ({}),
  isPopup = false,
}) {
  useInjectReducer({ key: "scheduleInterview", reducer });
  const dispatch = useDispatch();

  const {
    round,
    venue,
    interviewMode,
    instructions,
    dateTime,
    errorMessage,
    validations,
    isLoading,
  } = useSelector((state) => ({
    round: selectors.round(state),
    venue: selectors.venue(state),
    interviewMode: selectors.interviewMode(state),
    instructions: selectors.instructions(state),
    dateTime: selectors.dateTime(state),
    errorMessage: selectors.errorMessage(state),
    validations: selectors.validations(state),
    isLoading: selectors.isLoading(state),
  }));

  useEffect(() => {
    return () => dispatch(operations.scheduleInterviewInit());
  }, []);

  const onSubmit = () => {
    dispatch(
      operations.onSubmit(
        {
          positionId,
          clientId,
          candidateId,
          round: round.value,
          venue,
          interviewMode,
          instructions,
          dateTime: moment(dateTime).valueOf(),
        },
        postAdd,
        onConfirm
      )
    );
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
            size={isPopup ? "sm" : "md"}
            disabled={true}
          >
            <span className="btn-inner-icon">
              <Spinner size="sm" className="mr-2" />
            </span>
            <span className="btn-inner-text">
              {/* {isEdit ? "Save / Edit Candidate" : "Add Candidate"} */}
              Schedule Interview
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
          {/* {isEdit ? "Save / Edit Candidate" : "Add Candidate"} */}
          Schedule Interview
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
    <div
      className={cs("scheduleInterview", {
        "mx-3 mx-md-4 ml-lg-7": !isPopup,
      })}
    >
      <Helmet>
        <title>ScheduleInterview</title>
        <meta name="description" content="Description of ScheduleInterview" />
      </Helmet>
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <div className="text-primary font-weight-bold">
            {/* {isEdit ? "Edit Candidate" : "Add a Candidate"} */}
            Schedule Interview
          </div>
        </Col>
      </Row>
      <Form role="form" onSubmit={(e) => onSubmit(e)}>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Date & Time
          </Label>
          <Col>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-calendar-grid-58" />
                </InputGroupText>
              </InputGroupAddon>
              <ReactDatetime
                inputProps={{
                  placeholder: "Select Interview Date and Time",
                }}
                dateFormat="DD MMM YYYY"
                timeFormat="hh:mm a"
                className="text-sm"
                onChange={(e) => dispatch(operations.changeDateTime(e))}
                value={dateTime}
              />
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Round
          </Label>
          <Col>
            <RtReactSelect
              className="basic-multi-select text-sm"
              classNamePrefix="select"
              placeholder="Select Round"
              options={[
                {
                  value: "Round 1",
                  label: "Round 1",
                },
                {
                  value: "Round 2",
                  label: "Round 2",
                },
                {
                  value: "Round 3",
                  label: "Round 3",
                },
                {
                  value: "Final Round",
                  label: "Final Round",
                },
              ]}
              isMulti={false}
              value={round}
              error={validations}
              onChange={(e) => dispatch(operations.changeRound(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Venue
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changeVenue(e))}
              type="text"
              placeholder="Enter Venue"
              error={validations}
              name="venue"
              value={venue}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Interview Mode
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changeInterviewMode(e))}
              type="text"
              placeholder="Enter Interview Mode"
              error={validations}
              name="interviewMode"
              value={interviewMode}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Instructions
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changeInstructions(e))}
              type="text"
              placeholder="Enter Instructions"
              error={validations}
              name="instructions"
              value={instructions}
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

ScheduleInterview.propTypes = {};
