/**
 *
 * UploadFileLoading
 *
 */

import React from "react";
import Skeleton from 'react-loading-skeleton';
import {
  Row,
  Label,
  Col
} from "reactstrap";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import "./uploadFileLoadingStyle.scss";

function UploadFileLoading() {
  return <>
    <Col md="3" className="">
      <Row className="profile-img">
        <Col className="">
          <i className="ni ni-circle-08 text-primary text-lg pt-2" />
        </Col>
        <Col>
          <Skeleton />
        </Col>
      </Row>
    </Col>
  </>;
}

UploadFileLoading.propTypes = {};

export default UploadFileLoading;
