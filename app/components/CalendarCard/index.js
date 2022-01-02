/**
 *
 * Calendar
 *
 */

import React, { memo } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
} from "reactstrap";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import { parseDate, parseTime } from "utils/dateTimeHelpers";
import history from "utils/history";
import "./calendarStyle.scss";

function CalendarCard({
  upcomingEvents: {
    interviews = [],
    agreementExpiryDates = [],
    joiningDates = [],
  },
  onSelectDate,
}) {
  const [calendar, setCalendar] = React.useState({});
  let events = [];
  const calendarRef = React.useRef(null);
  const [modalChange, setModalChange] = React.useState(false);

  const [eventId, setEventId] = React.useState(null);
  const [eventTitle, setEventTitle] = React.useState(null);
  const [eventDescription, setEventDescription] = React.useState(null);
  const [eventType, setEventType] = React.useState(null);

  React.useEffect(() => {
    interviews.map(({ candidateId, dateTime }) =>
      events.push({
        eventId: candidateId._id,
        title: candidateId.name,
        type: "candidate",
        description: `${
          candidateId.name
        } has a interview scheduled at ${parseTime(dateTime)}.`,
        date: parseDate(dateTime, "YYYY-MM-DD"),
        className: "bg-primary text-secondary",
      })
    );

    agreementExpiryDates.map(({ _id, name, agreementExpiryDate }) =>
      events.push({
        eventId: _id,
        title: name,
        date: parseDate(agreementExpiryDate, "YYYY-MM-DD"),
        type: "client",
        description: `${name}'s agreement is expiring on ${parseDate(
          agreementExpiryDate,
          "DD MMM YYYY"
        )}.`,
        className: "bg-danger text-secondary",
      })
    );

    joiningDates.map(({ _id, name, joiningDate }) =>
      events.push({
        eventId: _id,
        title: name,
        type: "candidate",
        description: `Reminder for ${name} to join the company.`,
        date: parseDate(joiningDate, "YYYY-MM-DD"),
        className: "bg-success text-secondary",
      })
    );

    createCalendar();
  }, []);

  const createCalendar = () => {
    const calendarObj = new Calendar(calendarRef.current, {
      plugins: [interaction, dayGridPlugin],
      initialView: "dayGridWeek",
      fixedWeekCount: false,
      selectable: true,
      height: 250,
      dateClick: (info) => onSelectDate(info),
      editable: true,
      headerToolbar: {
        start: null,
        center: "title",
        end: null,
      },
      eventClick: ({ event }) => {
        setEventId(event.extendedProps.eventId);
        setEventTitle(event.title);
        setEventType(event.extendedProps.type);
        setEventDescription(event.extendedProps.description);
        setModalChange(true);
      },
      events: events,
    });
    calendarObj.render();
    setCalendar(calendarObj);
  };

  const getTitleForModal = (eventType) => {
    switch (eventType) {
      case "client":
        return "Client Name";
      case "candidate":
        return "Candidate Name";
      default:
        return "Title";
    }
  };
  return (
    <Card className="card-calender calender">
      <CardHeader>
        <Row>
          <div className="px-2">
            <i className="ni ni-calendar-grid-58 text-muted" />
          </div>
          <Col className="text-left">
            {/* <Button
              className="fullcalendar-btn-prev btn-neutral"
              color="default"
              onClick={() => {
                history.push("/calendar");
              }}
              size="sm"
            >
              View All
            </Button> */}
          </Col>
          <Col className="text-right">
            <Button
              className="fullcalendar-btn-prev btn-neutral"
              color="default"
              onClick={() => {
                calendar.prev();
              }}
              size="sm"
            >
              <i className="fas fa-angle-left" />
            </Button>
            <Button
              className="fullcalendar-btn-prev btn-neutral"
              color="default"
              onClick={() => {
                calendar.today();
              }}
              size="sm"
            >
              Today
            </Button>
            <Button
              className="fullcalendar-btn-next btn-neutral"
              color="default"
              onClick={() => {
                calendar.next();
              }}
              size="sm"
            >
              <i className="fas fa-angle-right" />
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <div
          className="calendar"
          data-toggle="calendar"
          id="calendar"
          ref={calendarRef}
        />
      </CardBody>
      <Modal
        isOpen={modalChange}
        toggle={() => setModalChange(false)}
        className="modal-dialog-centered modal-secondary"
      >
        <div className="modal-body">
          <label className="form-control-label">
            {getTitleForModal(eventType)}
          </label>
          <p>{eventTitle}</p>
          <label className="form-control-label">Description</label>
          <p>{eventDescription}</p>
          <i className="form-group--bar" />
        </div>
        <div className="modal-footer">
          <Button
            className="new-event--add"
            color="primary"
            type="button"
            onClick={() => {
              history.push(`/${eventType}/${eventId}`);
            }}
          >
            View Details
          </Button>
          <Button
            className="ml-auto"
            color="link"
            onClick={() => setModalChange(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </Card>
  );
}

CalendarCard.propTypes = {};

export default memo(CalendarCard);
