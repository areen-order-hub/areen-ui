/**
 *
 * SpocCard
 *
 */

import React, { memo } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import PropTypes from "prop-types";

import "./spocCardStyle.scss";

function SpocCard({ id, name, index, onDelete, onEdit }) {
  return (
    <Card className="spoc-card">
      <CardBody>
        <Row className="text-sm text-primary">
          <Col sm="1" />
          {name}
          <Col className="text-right">
            <i
              className="far fa-edit text-muted text-sm hover-pointer mr-2"
              onClick={() => onEdit(id, index)}
            />
            <i
              className="far fa-trash-alt text-muted text-sm hover-pointer"
              onClick={() => onDelete({ id, name, index })}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

SpocCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default memo(SpocCard);
