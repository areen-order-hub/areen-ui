/**
 *
 * PopularCourseTable
 *
 */

import React, { memo } from "react";
// import PropTypes from 'prop-types';
import history from "utils/history";
import { Card, CardBody, ListGroup, ListGroupItem, Row, Col } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import "./popularCourseTableStyle.scss";

export function PopularCourseTableSkeleton() {
  return (
    <Card className="mx-3 w-100">
      <CardBody>
        <Skeleton count={3} />
      </CardBody>
    </Card>
  );
}

function PopularCourseTable({ popularCourses = [] }) {
  const getCourseProgressBody = () => {
    if (!popularCourses || popularCourses.length == 0) {
      return (
        <ListGroupItem>
          <Row className="text-sm text-muted justify-content-center">
            There is no course available right now.
          </Row>
        </ListGroupItem>
      );
    }

    return popularCourses.map(({ id, title }, index) => {
      return (
        <ListGroupItem key={index}>
          <Row className="d-flex flex-column">
            <Col
              className="text-md mb-2 hover-pointer"
              onClick={() => history.push(`/course/${id}`)}
            >
              {`${index + 1}.  ${title}`}
            </Col>
          </Row>
        </ListGroupItem>
      );
    });
  };

  return (
    <div className="popularCourseTable w-100">
      <Card className="mx-3">
        <CardBody>
          <ListGroup className="list my--3" flush>
            {/* <tbody> */}
            {getCourseProgressBody()}
            {/* </tbody> */}
          </ListGroup>
        </CardBody>
      </Card>
    </div>
  );
}

PopularCourseTable.propTypes = {};

PopularCourseTable.defaultProps = {
  popularCourses: [],
};

export default memo(PopularCourseTable);
