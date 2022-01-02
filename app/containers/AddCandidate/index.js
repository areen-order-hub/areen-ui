/**
 *
 * AddCandidate
 *
 */

import React, { useState, useCallback } from "react";
import isEmpty from "lodash/isEmpty";
import qs from "query-string";
import cs from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
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
import RtReactSelect from "components/RtReactSelect";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import history from "utils/history";
import RtInput from "components/RtInput/index";
import { get } from "lodash";
import TextEditor from "components/TextEditor/index";
import RtCreatableSelect from "components/RtCreatableSelect";
import ReactDatetime from "react-datetime";
import "./addCandidateStyle.scss";

// PDF Related Imports
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { accept } from "./constants";
import { headerImage } from "./pdfAssets/headerImage";
import modifyPdf from "./modify";
import { PDFDocument } from "pdf-lib";
import { shapeDataForSnapshot } from "./dataConversionScript";
import { useDropzone } from "react-dropzone";
import { resumeTestData } from "./resumeTestData";
import htmlToPdfMake from "html-to-pdfmake";

export default function AddCandidate({
  id,
  reqId,
  jobTitle,
  postAdd = () => ({}),
  onConfirm = () => history.push("/candidates"),
  onCancel = () => history.push("/candidates"),
  isPopup = false,
}) {
  useInjectReducer({ key: "addCandidate", reducer });
  const dispatch = useDispatch();

  const [modifiedFile, setModifiedFile] = useState(null);
  var buffer1;
  var buffer2;
  var mergedFile;

  const {
    name,
    dateOfBirth,
    candidateEmail,
    phoneNumber,
    gender,
    maritalStatus,
    presentLocation,
    nativeLocation,
    qualification,
    yearsOfExperience,
    monthsOfExperience,
    presentCTC,
    presentCTCRemarks,
    expectedCTC,
    expectedCTCRemarks,
    noticePeriod,
    noticePeriodRemarks,
    experiences,
    reportingTo,
    noOfReportees,
    reasonForChange,
    consultantAssessment,
    isHoldingOffer,
    existingOfferAmount,
    positionId,
    isLoading,
    errorMessage,
    validations,
    isEdit,
  } = useSelector((state) => ({
    name: selectors.name(state),
    dateOfBirth: selectors.dateOfBirth(state),
    candidateEmail: selectors.candidateEmail(state),
    phoneNumber: selectors.phoneNumber(state),
    gender: selectors.gender(state),
    maritalStatus: selectors.maritalStatus(state),
    presentLocation: selectors.presentLocation(state),
    nativeLocation: selectors.nativeLocation(state),
    qualification: selectors.qualification(state),
    yearsOfExperience: selectors.yearsOfExperience(state),
    monthsOfExperience: selectors.monthsOfExperience(state),
    presentCTC: selectors.presentCTC(state),
    presentCTCRemarks: selectors.presentCTCRemarks(state),
    expectedCTC: selectors.expectedCTC(state),
    expectedCTCRemarks: selectors.expectedCTCRemarks(state),
    noticePeriod: selectors.noticePeriod(state),
    noticePeriodRemarks: selectors.noticePeriodRemarks(state),
    experiences: selectors.experiences(state),
    reportingTo: selectors.reportingTo(state),
    noOfReportees: selectors.noOfReportees(state),
    reasonForChange: selectors.reasonForChange(state),
    consultantAssessment: selectors.consultantAssessment(state),
    isHoldingOffer: selectors.isHoldingOffer(state),
    existingOfferAmount: selectors.existingOfferAmount(state),
    positionId: selectors.positionId(state),
    isLoading: selectors.isLoading(state),
    errorMessage: selectors.errorMessage(state),
    validations: selectors.validations(state),
    isEdit: selectors.isEdit(state),
  }));

  const [resumeUrl, changeResumeUrl] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      // console.log(acceptedFiles);
      fname = acceptedFiles[0].name;
      // console.log(fname);
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // console.log("Reader loading.....");
        // setBuffer2(reader.result);
        buffer2 = reader.result;
        modifyPdf(buffer2).then((res) => {
          // console.log("Inside Modify PDF Block", res);
          setModifiedFile(res);
          // modified = res;
          // console.log(
          //   "Inside Modify PDF Block After assigning modified",
          //   modified
          // );
        });
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  // let buffer1;
  // let buffer2;
  // let mergedFile;
  // let modified;
  let fname;

  async function createPDFSnapshot(data = {}) {
    return new Promise((resolve, reject) => {
      // console.log("CREATING PDF", data);
      let headerfooterDoc = {
        header: {
          margin: [0, 0, 0, 0],
          alignment: "center",
          image: headerImage,
          height: 100,
          width: 600,
        },
        content: [],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: "center",
            margin: [0, 30, 0, 20],
          },
          subheader: {
            fontSize: 14,
            margin: [0, 15, 0, 10],
            color: "#003893",
          },
          details: {
            fontSize: 9,
            bold: true,
            margin: [0, 0, 0, 0],
            color: "#000",
          },
          text: {
            alignment: "justify",
          },
          link: {
            decoration: "underline",
            color: "#0074c1",
          },
        },

        //
        // static footer
        footer: {
          margin: [0, 30, 0, 0],
          fontSize: 11,
          columns: [
            {
              text: "WE REFLECT YOU,",
              margin: [208, 0, 0, 0],
            },
            {
              color: "#C0D537",
              text: "WHEN WE SERVE YOU",
              margin: [2, 0, 0, 0],
            },
          ],
        },

        //   content: content,
        pageMargins: [50, 120, 50, 50],
      };

      let headerTable = {
        widths: [100, 125, 9, 100, 125],
        body: [
          [
            {
              text: "Candidate Name",
              alignment: "center",
              fillColor: "#D9D9D9",
              bold: true,
            },
            { text: data.name, alignment: "center" },
            { text: "", border: [false, false, false, false] },
            {
              text: "Current Location",
              alignment: "center",
              fillColor: "#D9D9D9",
              bold: true,
            },
            { text: data.presentLocation, alignment: "center" },
          ],
          [
            {
              text: "Position Applied",
              alignment: "center",
              fillColor: "#D9D9D9",
              bold: true,
            },
            { text: jobTitle, alignment: "center" },
            { text: "", border: [false, false, false, false] },
            {
              text: "DOB",
              alignment: "center",
              fillColor: "#D9D9D9",
              bold: true,
            },
            {
              text: get(data, "personalDetails.dob", "-"),
              alignment: "center",
            },
          ],
          [
            {
              text: "Total Experience",
              alignment: "center",
              fillColor: "#D9D9D9",
              bold: true,
            },
            { text: data.yearsOfExperience, alignment: "center" },
            { text: "", border: [false, false, false, false] },
            {
              text: "Marital Status",
              alignment: "center",
              fillColor: "#D9D9D9",
              bold: true,
            },
            {
              text: get(data, "personalDetails.maritalStatus", "-"),
              alignment: "center",
            },
          ],
        ],
      };
      let professionalExposure = {
        widths: [157, 158, 158],
        body: [
          [
            {
              text: "Professional Exposure",
              alignment: "center",
              fillColor: "#82cc41",
              bold: true,
              colSpan: 3,
              color: "white",
            },
            {},
            {},
          ],
          [
            {
              text: "Employer",
              alignment: "center",
              fillColor: "#D9D9D9",
              bold: true,
            },
            {
              text: "Designation",
              alignment: "center",
              fillColor: "#D9D9D9",
              bold: true,
            },
            {
              text: "Period",
              alignment: "center",
              fillColor: "#D9D9D9",
              bold: true,
            },
          ],
          ...data.careerHighlights.map((highlight, index) => [
            {
              text: highlight.companyName,
            },
            {
              text: highlight.designation,
            },
            {
              text: highlight.employmentPeriod,
            },
          ]),
        ],
      };
      let ctcDetails = {
        widths: [157, 158, 158],
        body: [
          [
            {
              text: "Current CTC",
              alignment: "center",
              fillColor: "#D9D9D9",
              bold: true,
            },
            {
              text: "Expected CTC",
              alignment: "center",
              fillColor: "#D9D9D9",
              bold: true,
            },
            {
              text: "Notice Period",
              alignment: "center",
              fillColor: "#D9D9D9",
              bold: true,
            },
          ],
          [
            {
              text: get(data, ["salary", "currentCTC"], "-"),
            },
            {
              text: get(data, ["salary", "expectedCTC"], "-"),
            },
            {
              text: get(data, ["salary", "noticePeriod"], "-"),
            },
          ],
        ],
      };
      let academicDetails = {
        widths: [163, 164, 100, 40],
        body: [
          [
            {
              text: "Academic Profile",
              alignment: "center",
              fillColor: "#82cc41",
              bold: true,
              colSpan: 4,
              color: "white",
            },
            {},
            {},
            {},
          ],
          [
            {
              text: "Course",
              alignment: "center",
              fillColor: "#D9D9D9",
              bold: true,
            },
            {
              text: "Institution",
              alignment: "center",
              fillColor: "#D9D9D9",
              bold: true,
            },
            {
              text: "Completed Year",
              alignment: "center",
              fillColor: "#D9D9D9",
              bold: true,
            },
            {
              text: "Score",
              alignment: "center",
              fillColor: "#D9D9D9",
              bold: true,
            },
          ],
          ...data.qualification.map((qualification, index) => [
            {
              text: qualification.degree,
            },
            {
              text: qualification.institution,
            },
            {
              text: qualification.passedOutYear,
              alignment: "right",
            },
            {
              text: qualification.percentage,
            },
          ]),
        ],
      };
      let otherDetails = {
        widths: [488],
        body: [
          [
            {
              text: "Consultant Assessment",
              alignment: "center",
              fillColor: "#82cc41",
              bold: true,
              color: "white",
            },
          ],
          [{ text: data.consultantAssessment }],
        ],
      };
      headerfooterDoc["content"].push(
        {
          table: headerTable,
          margin: [0, 0, 10, 20],
          layout: {
            paddingLeft: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
            paddingRight: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
            paddingTop: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
            paddingBottom: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
          },
        },
        {
          table: professionalExposure,
          margin: [0, 0, 0, 20],
          layout: {
            paddingLeft: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
            paddingRight: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
            paddingTop: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
            paddingBottom: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
          },
        },
        {
          table: ctcDetails,
          margin: [0, 0, 0, 20],
          layout: {
            paddingLeft: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
            paddingRight: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
            paddingTop: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
            paddingBottom: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
          },
        },
        {
          table: academicDetails,
          margin: [0, 0, 0, 20],
          layout: {
            paddingLeft: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
            paddingRight: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
            paddingTop: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
            paddingBottom: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
          },
        },
        {
          table: otherDetails,
          margin: [0, 0, 0, 0],
          layout: {
            paddingLeft: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
            paddingRight: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
            paddingTop: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
            paddingBottom: function(i, node) {
              if (i == 3 || i == 6 || i == 8) {
                return 3;
              }
              return 3;
            },
          },
        }
      );

      const pdfDocGenerator = pdfMake.createPdf(headerfooterDoc);
      // console.log(pdfDocGenerator);
      pdfDocGenerator.getBuffer(async (buffer) => {
        buffer1 = buffer.buffer;
        // console.log("BUFFER1", buffer1);
        // console.log("BUFFER22", modifiedFile);
        const pdf1 = await PDFDocument.load(buffer1, {
          ignoreEncryption: true,
        });
        const pdf2 = await PDFDocument.load(modifiedFile, {
          ignoreEncryption: true,
        });
        // console.log(pdf2);
        const mergedPdf = await PDFDocument.create();
        const copiedPagesA = await mergedPdf.copyPages(
          pdf1,
          pdf1.getPageIndices()
        );
        copiedPagesA.forEach((page) => mergedPdf.addPage(page));
        const copiedPagesB = await mergedPdf.copyPages(
          pdf2,
          pdf2.getPageIndices()
        );
        copiedPagesB.forEach((page) => mergedPdf.addPage(page));
        mergedFile = await await mergedPdf.save();

        resolve("Success");
      });
    });
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ onDrop, accept });

  let acceptedFileItems =
    acceptedFiles != undefined
      ? acceptedFiles.map((file, i) => <a key={file.path}>{file.path} </a>)
      : [];

  React.useEffect(() => {
    const candidateId = id || qs.parse(window.location.search).id;
    if (candidateId) {
      dispatch(operations.fetchDetails(candidateId));
    } else {
      dispatch(operations.addCandidateInit());
    }
    return () => dispatch(operations.addCandidateInit());
  }, []);

  const onSubmit = () => {
    if (isEdit) {
      const candidateId = id || qs.parse(location.search).id;
      dispatch(
        operations.editCandidate(
          candidateId,
          {
            name,
            dateOfBirth,
            candidateEmail,
            phoneNumber,
            gender: gender.value,
            maritalStatus: maritalStatus.value,
            presentLocation,
            nativeLocation,
            qualification,
            yearsOfExperience,
            monthsOfExperience,
            presentCTC,
            presentCTCRemarks,
            expectedCTC,
            expectedCTCRemarks,
            noticePeriod,
            noticePeriodRemarks,
            experiences,
            reportingTo,
            noOfReportees,
            reasonForChange,
            consultantAssessment,
            isHoldingOffer: isHoldingOffer.value,
            existingOfferAmount,
            positionId: reqId || positionId,
            files: acceptedFiles,
            mergedFile: new Blob([mergedFile], { type: "application/pdf" }),
          },
          postAdd,
          onConfirm
        )
      );
    } else {
      dispatch(
        operations.onSubmit(
          {
            name,
            dateOfBirth,
            candidateEmail,
            phoneNumber,
            gender: gender.value,
            maritalStatus: maritalStatus.value,
            presentLocation,
            nativeLocation,
            qualification,
            yearsOfExperience,
            monthsOfExperience,
            presentCTC,
            presentCTCRemarks,
            expectedCTC,
            expectedCTCRemarks,
            noticePeriod,
            noticePeriodRemarks,
            experiences,
            reportingTo,
            noOfReportees,
            reasonForChange,
            consultantAssessment,
            isHoldingOffer: isHoldingOffer.value,
            existingOfferAmount,
            positionId: reqId,
            files: acceptedFiles,
            mergedFile: new Blob([mergedFile], { type: "application/pdf" }),
          },
          postAdd,
          onConfirm
        )
      );
    }
  };

  async function testFunc1(e) {
    e.preventDefault();
    let convertedData = shapeDataForSnapshot({
      name,
      dateOfBirth,
      candidateEmail,
      phoneNumber,
      gender: gender.value,
      maritalStatus: maritalStatus.value,
      presentLocation,
      nativeLocation,
      qualification,
      yearsOfExperience,
      monthsOfExperience,
      presentCTC,
      presentCTCRemarks,
      expectedCTC,
      expectedCTCRemarks,
      noticePeriod,
      noticePeriodRemarks,
      experiences,
      reportingTo,
      noOfReportees,
      reasonForChange,
      consultantAssessment: consultantAssessment.join("\n"),
      isHoldingOffer: isHoldingOffer.value,
      existingOfferAmount,
      positionId: reqId,
      files: acceptedFiles,
    });

    try {
      await createPDFSnapshot(convertedData);
      // download(mergedFile, "Resume.pdf", "application/pdf");
      onSubmit();
    } catch (err) {}
  }

  function download(file, filename, type) {
    // const link = document.getElementById("link");
    // link.download = filename;
    let binaryData = [];
    binaryData.push(file);
    window.location.href = URL.createObjectURL(
      new Blob(binaryData, { type: type })
    );
  }

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
              {isEdit ? "Save / Edit Candidate" : "Add Candidate"}
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
          onClick={(e) => testFunc1(e)}
        >
          {isEdit ? "Save / Edit Candidate" : "Add Candidate"}
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

  const getQualificationInputComponent = () =>
    qualification &&
    qualification.map((_, index) => (
      <React.Fragment key={index}>
        <FormGroup row>
          <Label sm={2} className="text-sm text-left">
            Degree {index + 1}
          </Label>
          <Col>
            <RtInput
              type="text"
              placeholder="Enter Degree"
              error={validations}
              name={`${qualification[index]["degree"]}`}
              value={qualification[index]["degree"]}
              onChange={(e) =>
                dispatch(
                  operations.changeQualification({
                    payload: {
                      ...qualification[index],
                      degree: e,
                    },
                    index,
                  })
                )
              }
            />
          </Col>
          <Label sm={2} className="text-sm text-left">
            Percentage
          </Label>
          <Col sm={2}>
            <RtInput
              type="text"
              placeholder="eg.80%/8.0"
              error={validations}
              name={`${qualification[index]["percentage"]}`}
              value={qualification[index]["percentage"]}
              onChange={(e) =>
                dispatch(
                  operations.changeQualification({
                    payload: {
                      ...qualification[index],
                      percentage: e,
                    },
                    index,
                  })
                )
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} className="text-sm text-left">
            Institution {index + 1}
          </Label>
          <Col>
            <RtInput
              type="text"
              placeholder="Enter Institution Name"
              error={validations}
              name={`${qualification[index]["institution"]}`}
              value={qualification[index]["institution"]}
              onChange={(e) =>
                dispatch(
                  operations.changeQualification({
                    payload: {
                      ...qualification[index],
                      institution: e,
                    },
                    index,
                  })
                )
              }
            />
          </Col>
          <Label sm={2} className="text-sm text-left">
            Passed Out Year
          </Label>
          <Col sm={2}>
            <RtInput
              type="text"
              placeholder="eg. 2017"
              error={validations}
              name={`${qualification[index]["passedOutYear"]}`}
              value={qualification[index]["passedOutYear"]}
              onChange={(e) =>
                dispatch(
                  operations.changeQualification({
                    payload: {
                      ...qualification[index],
                      passedOutYear: e,
                    },
                    index,
                  })
                )
              }
            />
          </Col>
        </FormGroup>
      </React.Fragment>
    ));

  const getExperiencesInputComponent = () =>
    experiences &&
    experiences.map((_, index) => (
      <React.Fragment key={index}>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            {index == 0
              ? "Current Company Name"
              : `Previous Company ${index} Name`}
          </Label>
          <Col>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeExperiences({
                    payload: {
                      ...experiences[index],
                      companyName: e,
                    },
                    index,
                  })
                )
              }
              type="text"
              placeholder="Enter Company Name"
              error={validations}
              name={`${experiences[index]["companyName"]}`}
              value={experiences[index]["companyName"]}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            {index == 0
              ? "Designation at Current Company"
              : `Designation at previous Company ${index}`}
          </Label>
          <Col>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeExperiences({
                    payload: {
                      ...experiences[index],
                      designation: e,
                    },
                    index,
                  })
                )
              }
              type="text"
              placeholder="Enter Designation"
              error={validations}
              name={`${experiences[index]["designation"]}`}
              value={experiences[index]["designation"]}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            {index == 0
              ? "Employment Period at Current Company"
              : `Employment Period at previous Company ${index}`}
          </Label>
          <Col>
            <RtInput
              onChange={(e) =>
                dispatch(
                  operations.changeExperiences({
                    payload: {
                      ...experiences[index],
                      employmentPeriod: e,
                    },
                    index,
                  })
                )
              }
              type="text"
              placeholder="Enter Employment Period"
              error={validations}
              name={`${experiences[index]["employmentPeriod"]}`}
              value={experiences[index]["employmentPeriod"]}
            />
          </Col>
        </FormGroup>
      </React.Fragment>
    ));

  const getConsultantAssessmentInputComponent = () =>
    consultantAssessment &&
    consultantAssessment.map((_, index) => (
      <Col key={index} className={index !== 0 ? "mt-3" : ""}>
        <RtInput
          onChange={(e) => {
            dispatch(
              operations.changeconsultantAssessment({ index, payload: e })
            );
          }}
          type="textarea"
          placeholder="Enter Assessment"
          error={validations}
          name={`${consultantAssessment[index]}`}
          value={consultantAssessment[index]}
        />
      </Col>
    ));

  return (
    <div
      className={cs("addCandidate", {
        "mx-3 mx-md-4 ml-lg-7": !isPopup,
      })}
    >
      <Helmet>
        <title>AddCandidate</title>
        <meta name="description" content="Description of AddCandidate" />
      </Helmet>
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <div className="text-primary font-weight-bold">
            {isEdit ? "Edit Candidate" : "Add a Candidate"}
          </div>
        </Col>
      </Row>
      <Form role="form" onSubmit={(e) => onSubmit(e)}>
        <FormGroup row>
          <Label for="exampleSelect" className="text-sm" sm={3}>
            Upload Resume
          </Label>
          <Col>
            <div
              {...getRootProps({ className: "dropzone" })}
              className="dz-drag-hover dz-preview-img  dz-message dropzone"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the file here ...</p>
              ) : (
                <p>Drag and drop your file here, or click to select file.</p>
              )}
            </div>
          </Col>
        </FormGroup>
        <FormGroup row>
          <div className="text-sm">
            {!isEmpty(resumeUrl) && (
              <div>(click on the file name to view/download the document)</div>
            )}
            <Label for="exampleSelect" className="text-sm ml-4" sm={12}>
              {acceptedFiles.length > 0 && (
                <>Uploaded File - {acceptedFileItems}</>
              )}
            </Label>
          </div>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Name
          </Label>
          <Col>
            <RtInput
              onChange={(e) => {
                dispatch(operations.changeName(e));
              }}
              type="text"
              placeholder="Enter Name"
              error={validations}
              name="name"
              value={name}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Date Of Birth
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
                  placeholder: "Select DOB",
                }}
                dateFormat="DD MMM YYYY"
                timeFormat={false}
                className="text-sm"
                onChange={(e) => dispatch(operations.changeDob(e))}
                value={dateOfBirth}
              />
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Email
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changeEmail(e))}
              type="text"
              placeholder="Enter Email"
              error={validations}
              name="candidateEmail"
              value={candidateEmail}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Phone Number
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changePhoneNumber(e))}
              type="text"
              placeholder="Enter Phone Number"
              error={validations}
              name="phoneNumber"
              value={phoneNumber}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Gender
          </Label>
          <Col>
            <RtReactSelect
              className="basic-multi-select text-sm"
              classNamePrefix="select"
              placeholder="Select Gender"
              options={[
                {
                  value: "Male",
                  label: "Male",
                },
                {
                  value: "Female",
                  label: "Female",
                },
                {
                  value: "Transgender",
                  label: "Transgender",
                },
              ]}
              isMulti={false}
              value={gender}
              error={validations}
              onChange={(e) => dispatch(operations.changeGender(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Marital Status
          </Label>
          <Col>
            <RtReactSelect
              className="basic-multi-select text-sm"
              isMulti={false}
              options={[
                {
                  value: "Single",
                  label: "Single",
                },
                {
                  value: "Married",
                  label: "Married",
                },
              ]}
              classNamePrefix="select"
              placeholder="Select Marital Status"
              value={maritalStatus}
              error={validations}
              onChange={(e) => dispatch(operations.changeMaritalStatus(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Present Location
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changePresentLocation(e))}
              type="text"
              placeholder="Enter Present location"
              error={validations}
              name="presentLocation"
              value={presentLocation}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Native location
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changeNativeLocation(e))}
              type="text"
              placeholder="Enter Native Location"
              error={validations}
              name="nativeLocation"
              value={nativeLocation}
            />
          </Col>
        </FormGroup>
        <hr />
        {/* <FormGroup row>
          <Label sm={3} className="text-sm text-primary">
            Qualification:
          </Label>
        </FormGroup> */}
        {getQualificationInputComponent()}
        <FormGroup row className="text-right">
          <Col sm={6} />
          <Col sm={6} className="text-right text-sm">
            <Button
              color="link"
              className="p-0"
              onClick={() => dispatch(operations.addNewQualification())}
            >
              + Add Qualification
            </Button>
          </Col>
        </FormGroup>
        <hr />
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Experience in Years
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changeYearsOfExperience(e))}
              type="text"
              placeholder="Enter Years"
              error={validations}
              name="yearsOfExperience"
              value={yearsOfExperience}
            />
          </Col>
          <Label sm={3} className="text-sm">
            and Months
          </Label>
          <Col md="3">
            <RtInput
              onChange={(e) => dispatch(operations.changeMonthsOfExperience(e))}
              type="text"
              placeholder="Enter Months"
              error={validations}
              name="monthsOfExperience"
              value={monthsOfExperience}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Present CTC
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changePresentCTC(e))}
              type="text"
              placeholder="Eg: 5.5 or 12"
              error={validations}
              name="presentCTC"
              value={presentCTC}
            />
          </Col>
          <Label sm={3} className="text-sm">
            Remarks
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changePresentCTCRemarks(e))}
              type="text"
              placeholder="Eg. LPA, Take Away"
              error={validations}
              name="presentCTCRemarks"
              value={presentCTCRemarks}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Expected CTC
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changeExpectedCTC(e))}
              type="text"
              placeholder="Eg: 5.5 or 12"
              error={validations}
              name="expectedCTC"
              value={expectedCTC}
            />
          </Col>
          <Label sm={3} className="text-sm">
            Remarks
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changeExpectedCTCRemarks(e))}
              type="text"
              placeholder="Eg. LPA, Take Away"
              error={validations}
              name="expectedCTCRemarks"
              value={expectedCTCRemarks}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Notice Period (in days)
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changeNoticePeriod(e))}
              type="text"
              placeholder="Enter Notice Period"
              error={validations}
              name="noticePeriod"
              value={noticePeriod}
            />
          </Col>
          <Label sm={3} className="text-sm">
            Remarks
          </Label>
          <Col>
            <RtInput
              onChange={(e) =>
                dispatch(operations.changeNoticePeriodRemarks(e))
              }
              type="text"
              placeholder="Eg. Remarks"
              error={validations}
              name="noticePeriodRemarks"
              value={noticePeriodRemarks}
            />
          </Col>
        </FormGroup>
        <hr />
        {getExperiencesInputComponent()}
        <FormGroup row className="text-right">
          <Col sm={6} />
          <Col sm={6} className="text-right text-sm">
            <Button
              color="link"
              className="p-0"
              onClick={() => dispatch(operations.addNewExperience())}
            >
              + Add Experience
            </Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Reporting To
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changeReportingTo(e))}
              type="text"
              placeholder="Enter Reporting To"
              error={validations}
              name="reportingTo"
              value={reportingTo}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            No. of Reportees
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changeNumberOfReportees(e))}
              type="text"
              placeholder="Enter No. of Reportees"
              error={validations}
              name="noOfReportees"
              value={noOfReportees}
            />
          </Col>
        </FormGroup>
        <hr />
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Reason For Change
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changeReasonForChange(e))}
              type="text"
              placeholder="Enter Reason For Change"
              error={validations}
              name="reasonForChange"
              value={reasonForChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Consultant Assessment
          </Label>
          <Col>
            <Row className="d-flex flex-column">
              {getConsultantAssessmentInputComponent()}
            </Row>
          </Col>
        </FormGroup>
        <FormGroup row className="text-right">
          <Col sm={6} />
          <Col sm={6} className="text-right text-sm">
            <Button
              color="link"
              className="p-0"
              onClick={() => dispatch(operations.addNewAssessment())}
            >
              + Add Assessment Point
            </Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Holding Offers?
          </Label>
          <Col>
            <RtReactSelect
              className="basic-multi-select text-sm"
              isMulti={false}
              options={[
                {
                  value: "true",
                  label: "Yes",
                },
                {
                  value: "false",
                  label: "No",
                },
              ]}
              classNamePrefix="select"
              placeholder="Select Holding Offer Status"
              error={validations}
              name="isHoldingOffer"
              value={isHoldingOffer}
              onChange={(e) => dispatch(operations.changeHoldingOfferStatus(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Offered Amount
          </Label>
          <Col>
            <RtInput
              onChange={(e) =>
                dispatch(operations.changeExistingOfferedAmount(e))
              }
              type="text"
              placeholder="Enter Existing Offered Amount"
              error={validations}
              name="existingOfferAmount"
              value={existingOfferAmount}
            />
          </Col>
        </FormGroup>
        {/* <Col>
            {!isEmpty(signedFileUrls)
              ? signedFileUrls.map(({ key, url }, index) => (
                  <Row className="mt-1">
                    Existing File {index + 1}
                    <Button
                      type="button"
                      color="info"
                      className="ml-1"
                      size="sm"
                      onClick={(e) => window.open(url, "_blank")}
                    >
                      <span className="btn-inner--icon">
                        <i className="fas fa-paperclip" />
                      </span>{" "}
                    </Button>
                    <Button
                      type="button"
                      color="danger"
                      size="sm"
                      onClick={(e) =>
                        dispatch(operations.deleteAndRemoveFile(key, fileUrl))
                      }
                    >
                      <span className="btn-inner--icon">
                        <i className="fas fa-trash-alt" />
                      </span>{" "}
                    </Button>
                  </Row>
                ))
              : ""}
          </Col> */}

        <FormGroup row>
          <Col className="mt-3">{getSubmitButton()}</Col>
          <Col>{getErrorComponent()}</Col>
        </FormGroup>
      </Form>
    </div>
  );
}

AddCandidate.propTypes = {};
