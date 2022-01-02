/**
 *
 * PositionTracker
 *
 */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import qs from "query-string";
import { Helmet } from "react-helmet";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
  Button,
} from "reactstrap";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import { getFieldData } from "./helpers";
import * as operations from "./actions";
import * as selectors from "./selectors";
import * as XLSX from "xlsx/xlsx.mjs";
import "./positionTrackerStyle.scss";

export default function PositionTracker() {
  useInjectReducer({ key: "positionTracker", reducer });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(operations.fetchFields());
    const id = qs.parse(location.search).id;
    if (id) {
      dispatch(operations.fetchCandidates(id));
    }
  }, []);

  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const {
    isFieldsLoading,
    firstRowFields,
    secondRowFields,
    thirdRowFields,
    candidates,
    candidatesMap,
  } = useSelector((state) => ({
    isFieldsLoading: selectors.isFieldsLoading(state),
    firstRowFields: selectors.firstRowFields(state),
    secondRowFields: selectors.secondRowFields(state),
    thirdRowFields: selectors.thirdRowFields(state),
    candidates: selectors.candidates(state),
    candidatesMap: selectors.candidatesMap(state),
  }));

  const onClickField = (field) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(
        selectedFields.filter((selectedField) => selectedField !== field)
      );
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const onClickCandidate = (candidateId) => {
    if (selectedCandidates.includes(candidateId)) {
      setSelectedCandidates(
        selectedCandidates.filter(
          (selectedCandidateId) => selectedCandidateId !== candidateId
        )
      );
    } else {
      setSelectedCandidates([...selectedCandidates, candidateId]);
    }
  };

  const getCandidates = () => {
    return candidates.map(({ id, name }, index) => (
      <React.Fragment key={id}>
        <Button
          color="primary"
          outline
          className="m-1"
          onClick={() => onClickCandidate(id)}
          active={selectedCandidates.includes(id)}
        >
          {name}
        </Button>
        {(index + 1) % 8 === 0 ? <div className="w-100" /> : null}
      </React.Fragment>
    ));
  };

  const shapeAndDownload = () => {
    let data = [];
    selectedCandidates.forEach((candidateId) => {
      let row = {};
      selectedFields.forEach((field) => {
        row[field] = getFieldData(field, candidatesMap[candidateId]);
      });
      data.push(row);
    });

    var ws = XLSX.utils.json_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Candidates");
    var wbout = XLSX.write(wb, { bookType: "csv", type: "binary" });

    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }

    const jobTitle = qs.parse(location.search).jobTitle;

    saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      `${decodeURI(jobTitle)} - candidates.csv`
    );
  };

  return (
    <div className="positionTracker mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>PositionTracker</title>
        <meta name="description" content="Description of PositionTracker" />
      </Helmet>
      <Card className="mt-3">
        <CardHeader>
          <span className="h1 text-primary">Select Fields</span>
        </CardHeader>
        <CardBody>
          {!isFieldsLoading && (
            <>
              <Row className="d-flex justify-content-center">
                <ButtonGroup>
                  {firstRowFields.map((field) => (
                    <Button
                      key={field}
                      color="primary"
                      outline
                      className="m-1"
                      onClick={() => onClickField(field)}
                      active={selectedFields.includes(field)}
                    >
                      {field}
                    </Button>
                  ))}
                </ButtonGroup>
              </Row>
              <Row className="d-flex justify-content-center">
                <ButtonGroup>
                  {secondRowFields.map((field) => (
                    <Button
                      key={field}
                      color="primary"
                      outline
                      className="m-1"
                      onClick={() => onClickField(field)}
                      active={selectedFields.includes(field)}
                    >
                      {field}
                    </Button>
                  ))}
                </ButtonGroup>
              </Row>
              <Row className="d-flex justify-content-center">
                <ButtonGroup>
                  {thirdRowFields.map((field) => (
                    <Button
                      key={field}
                      color="primary"
                      outline
                      className="m-1"
                      onClick={() => onClickField(field)}
                      active={selectedFields.includes(field)}
                    >
                      {field}
                    </Button>
                  ))}
                </ButtonGroup>
              </Row>
            </>
          )}
        </CardBody>
      </Card>
      <Card className="mt-3">
        <CardHeader>
          <span className="h1 text-primary">Select Candidates</span>
        </CardHeader>
        <CardBody>
          <ButtonGroup className="d-flex flex-wrap">
            {getCandidates()}
          </ButtonGroup>
        </CardBody>
      </Card>
      <Row className="text-right">
        <Col>
          <Button color="primary" onClick={() => shapeAndDownload()}>
            Download
          </Button>
        </Col>
      </Row>
    </div>
  );
}

PositionTracker.propTypes = {};
