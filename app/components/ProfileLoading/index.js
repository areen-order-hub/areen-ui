/**
 *
 * ProfileLoading
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

import "./profileLoadingStyle.scss";

function ProfileLoading() {
  return <>
      <Col >
        <Row>
          <Col>
            <Skeleton />
          </Col>
          <Col>
            <Skeleton />
          </Col>
        </Row>
        <Row>
          <Col >
            <Skeleton />
          </Col>
          <Col className="">
            <Skeleton />
          </Col>
        </Row>
        <Row>
          <Col>
            <Skeleton />
          </Col>
          <Col >
            <Skeleton />
          </Col>
        </Row>
        <Row>
          <Col >
            <Skeleton />
          </Col>
          <Col >
            <Skeleton />
          </Col>
        </Row>
        <Row >
          <Col>
            <Skeleton />
          </Col>
        </Row>
        <Row className="bo-b-grey">
          <Col>
            <Skeleton />
          </Col>
        </Row>

        <Row className="display-grid mt-3 bo-b-grey">
          <Col className="mb-3">
            <Label>Where can we find you online?</Label>
          </Col>
          <Col>
            <Row >
              <Col >
                <Skeleton />
              </Col>
              <Col>
                <Skeleton />
              </Col>
            </Row>
            <Row>
              <Col>
                <Skeleton />
              </Col>
              <Col>
                <Skeleton />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="display-grid bo-b-grey mt-3">
          <Col className="mb-3"><Label>Your work experience</Label></Col>
          <Col>
            <Row >
              <Col>
                <Skeleton />
              </Col>
              <Col>
                <Skeleton />
              </Col>
            </Row>
            <Row >
              <Col>
                <Skeleton />
              </Col>
              <Col>
                <Skeleton />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="ml-4">
                <Skeleton />
              </Col>
            </Row>
            <Row className="">
              <Col>
                <Skeleton />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="display-grid mt-3 bo-b-grey">
          <Col><Label>Education</Label></Col>
          <Col className="mb-3">
            <Row className="">
              <Col className="">
                <Skeleton />
              </Col>
              <Col className="">
                <Skeleton />
              </Col>
            </Row>
          </Col>
          <Col className="mb-3">
            <Row className="">
              <Col>
                <Skeleton />
              </Col>
              <Col>
                <Skeleton />
              </Col>
            </Row>
          </Col>
          <Col className="">
            <Row className="">
              <Col>
                <Skeleton />
              </Col>
              <Col>
                <Skeleton />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="display-grid mt-3 bo-b-grey">
          <Col >
            <Skeleton />
          </Col>
        </Row>
        <Row className="display-grid mt-3">
          <Col >
            <Skeleton />
          </Col>
        </Row>
      </Col>
  </>
}

ProfileLoading.propTypes = {};

export default ProfileLoading;
