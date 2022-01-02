/**
 *
 * RtFullCalendar
 *
 */

import React, { memo } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Modal,
  Container,
  Row,
  Col,
} from "reactstrap";
import "./rtFullCalendarStyle.scss";
import history from "utils/history";
import { parseDate } from "utils/dateTimeHelpers";
let calendar;

function RtFullCalendar({ upcomingEvents = [], upcomingClasses = [] }) {
  let calendarEvents = [];
  const calendarRef = React.useRef(null);
  const [modalChange, setModalChange] = React.useState(false);
  const [eventId, setEventId] = React.useState(null);
  const [eventTitle, setEventTitle] = React.useState(null);
  const [eventDescription, setEventDescription] = React.useState(null);
  const [eventType, setEventType] = React.useState(null);
  const [courseProgress, setCourseProgress] = React.useState(null);
  const [currentDate, setCurrentDate] = React.useState(null);

  React.useEffect(() => {
    upcomingEvents.map(({ id, title, dateTime, shortDescription }) =>
      calendarEvents.push({
        eventId: id,
        title,
        type: "event",
        date: parseDate(dateTime, "YYYY-MM-DD"),
        description: shortDescription,
        className: "bg-primary text-secondary",
      })
    );
    upcomingClasses.map(
      ({ courseId, title, dateTime, description, courseProgress }) =>
        calendarEvents.push({
          eventId: courseId,
          title,
          description,
          courseProgress,
          type: "course",
          date: parseDate(dateTime, "YYYY-MM-DD"),
          className: "bg-danger text-secondary",
        })
    );
    createCalendar();
  }, []);

  const createCalendar = () => {
    calendar = new Calendar(calendarRef.current, {
      plugins: [interaction, dayGridPlugin],
      initialView: "dayGridMonth",
      selectable: true,
      editable: true,
      events: calendarEvents,
      headerToolbar: "",

      // Popup Event Function
      eventClick: ({ event }) => {
        setEventId(event.extendedProps.eventId);
        setEventTitle(event.title);
        setEventType(event.extendedProps.type);
        setCourseProgress(event.extendedProps.courseProgress || 0);
        setEventDescription(event.extendedProps.description);
        setModalChange(true);
      },
    });
    calendar.render();
    setCurrentDate(calendar.view.title);
  };

  const changeView = (newView) => {
    calendar.changeView(newView);
    setCurrentDate(calendar.view.title);
  };

  return (
    <>
      <div className="header header-dark bg-primary pb-6 content__title content__title--calendar">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="6">
                <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0 mr-1">
                  {currentDate}
                </h6>
              </Col>
              <Col className="mt-3 mt-md-0 text-md-right" lg="6">
                <Button
                  className="fullcalendar-btn-prev btn-neutral"
                  color="default"
                  onClick={() => {
                    calendar.prev();
                    setCurrentDate(calendar.view.title);
                  }}
                  size="sm"
                >
                  <i className="fas fa-angle-left" />
                </Button>
                <Button
                  className="btn-neutral"
                  color="default"
                  data-calendar-view="month"
                  onClick={() => {
                    calendar.today();
                    setCurrentDate(calendar.view.title);
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
                    setCurrentDate(calendar.view.title);
                  }}
                  size="sm"
                >
                  <i className="fas fa-angle-right" />
                </Button>
                <Button
                  className="btn-neutral"
                  color="default"
                  data-calendar-view="month"
                  onClick={() => changeView("dayGridMonth")}
                  size="sm"
                >
                  Month
                </Button>
                <Button
                  className="btn-neutral"
                  color="default"
                  data-calendar-view="basicWeek"
                  onClick={() => changeView("dayGridWeek")}
                  size="sm"
                >
                  Week
                </Button>
                <Button
                  className="btn-neutral"
                  color="default"
                  data-calendar-view="basicDay"
                  onClick={() => changeView("dayGridDay")}
                  size="sm"
                >
                  Day
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card className="card-calendar rtFullCalendar">
              <CardHeader>
                <h5 className="h3 mb-0">Calendar</h5>
              </CardHeader>
              <CardBody className="p-0">
                <div
                  className="calendar"
                  data-toggle="calendar"
                  id="calendar"
                  ref={calendarRef}
                />
              </CardBody>
            </Card>
            <Modal
              isOpen={modalChange}
              toggle={() => setModalChange(false)}
              className="modal-dialog-centered modal-secondary"
            >
              <div className="modal-body">
                <label className="form-control-label">Event title</label>
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
                    eventType == "course"
                      ? history.push(
                          `/${eventType}/${eventId}/play?start=${courseProgress}`
                        )
                      : history.push(`/${eventType}/${eventId}`);
                  }}
                >
                  {eventType == "event" ? "Go to Event" : "Go to Course"}
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
          </div>
        </Row>
      </Container>
    </>
  );
}

RtFullCalendar.propTypes = {};

export default memo(RtFullCalendar);
