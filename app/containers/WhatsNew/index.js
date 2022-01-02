/**
 *
 * WhatsNew
 *
 */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import reducer from "./reducer";
import classnames from "classnames";
import { parseDate } from "utils/dateTimeHelpers";
import * as operations from "./actions";
import * as selectors from "./selectors";
import "./whatsNewStyle.scss";

export default function WhatsNew() {
  useInjectReducer({ key: "whatsNew", reducer });
  const dispatch = useDispatch();

  const { updates } = useSelector((state) => ({
    updates: selectors.updates(state),
  }));

  useEffect(() => {
    dispatch(operations.fetchUpdates());
  }, []);

  return (
    <div className="whatsNew mx-3 mx-md-4 ml-lg-7 my-3">
      <Helmet>
        <title>WhatsNew</title>
        <meta name="description" content="Description of WhatsNew" />
      </Helmet>
      {updates.map(({ version, updates: appUpdates, createdAt }) => (
        <Card>
          <CardHeader>
            <Row className="px-1 d-flex justify-content-between align-items-center">
              <Col>
                <span className="h1 text-primary">{version}</span>
              </Col>
              <Col className="text-right">
                {parseDate(createdAt, "DD MMM YYYY")}
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            {/* <ListGroup flush>
              {appUpdates.map((update) => (
                <ListGroupItem>{update}</ListGroupItem>
              ))}
            </ListGroup> */}
            <ul>
              {appUpdates.map((update) => (
                <li
                  className={classnames("my-1", {
                    "text-info": update.startsWith("(Admin)"),
                    "text-warning": update.startsWith("(Note)"),
                  })}
                >
                  {update}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

WhatsNew.propTypes = {};
