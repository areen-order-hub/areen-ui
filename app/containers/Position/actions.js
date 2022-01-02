/*
 *
 * Position actions
 *
 */
import _get from "lodash/get";
import {
  SET_POSITION_DETAILS,
  SET_CANDIDATE_DETAILS,
  SET_INTERVIEW_DETAILS,
  POSITION_DETAILS_INIT,
} from "./constants";
import { downloadFile } from "api/file";
import { getCandidates } from "api/candidate";
import { getInterviews } from "api/interview";
import { getPosition, deletePosition } from "api/position";
import { editCandidateApi } from "api/candidate";
import history from "utils/history";
import { parseDateTime, getDayFromNumber } from "utils/dateTimeHelpers";
import moment from "moment-timezone";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
import { recruitmentStatusToInterviewRound } from "./helpers";

export const sendCallLetter = (
  candidateName,
  candidateEmail,
  recruitmentStatus,
  candidateId,
  clientName,
  clientAbout,
  clientWebsite,
  jobTitle,
  positionId
) => {
  return async (dispatch) => {
    try {
      const { data } = await getInterviews({
        positionId,
        candidateId,
        round: recruitmentStatusToInterviewRound(recruitmentStatus),
      });

      const { interviewMode, venue, dateTime } = data[0];
      const { date, time } = parseDateTime(dateTime, "DD MMM YYYY");

      let subject = encodeURI(`Interview Call letter - ${clientName}`);
      let body = encodeURI(`Dear ${candidateName},
      
Greetings from Areen Order Hub!

We are happy to inform you that your profile has been shortlisted for "${interviewMode}" interview with our client "${clientName}" for the position of ${jobTitle}.

About our client: ${clientAbout}

Company Website: ${clientWebsite}

Position: ${jobTitle}

Interview Details: 

Venue: ${venue}

Interview Date: ${date} (${getDayFromNumber(moment(dateTime).day())})

Interview Time: ${time}
    `);

      window.open(
        `mailto:${candidateEmail}?subject=${subject}&body=${body}`,
        "_blank"
      );
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to send Interview Call letter",
      });
    }
  };
};

export const fetchInterviews = (positionId) => {
  return async (dispatch) => {
    try {
      const { data } = await getInterviews({ positionId });
      dispatch(setInterviewDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Interview details",
      });
    }
  };
};

export const fetchCandidates = (positionId) => {
  return async (dispatch) => {
    try {
      const { data } = await getCandidates({ positionId });
      let updatedCandidateDetails = [];
      if (data) {
        for (let i = 0; i < data.length; i++) {
          try {
            const { data: url } = await downloadFile(
              "snapshots",
              data[i].fileUrl[0]
            );

            updatedCandidateDetails.push({
              ...data[i],
              fileUrl: [url],
            });
          } catch (error) {
            updatedCandidateDetails.push({
              ...data[i],
              fileUrl: [],
            });
            NotificationHandler.open({
              operation: "failure",
              message:
                _get(error, "response.data", null) ||
                "Something went wrong. Please try again later",
              title: "Unable to download some snapshots",
            });
          }
        }
      }
      dispatch(setCandidateDetails(updatedCandidateDetails));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Candidate details",
      });
    }
  };
};

export const fetchPosition = (positionId) => {
  return async (dispatch) => {
    try {
      const { data } = await getPosition(positionId);
      let signedUrl = "";
      if (data.jobDescriptionFile) {
        const { data: jdFileUrl } = await downloadFile(
          "jobDescriptions",
          data.jobDescriptionFile
        );
        signedUrl = jdFileUrl;
      }
      dispatch(
        setPositionDetails({
          ...data,
          jobDescriptionFile: signedUrl != "" ? signedUrl : "",
        })
      );
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Position details",
      });
    }
  };
};

export const editCandidateDetails = (id, candidateDetails, positionId) => {
  return async (dispatch) => {
    try {
      await editCandidateApi(id, candidateDetails);
      NotificationHandler.open({
        operation: "success",
        title: "Candidate's details updated Successfully",
      });
      dispatch(fetchCandidates(positionId));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to change the details of the candidate",
      });
    }
  };
};

export const onDelete = (id) => {
  return async (dispatch) => {
    try {
      await deletePosition(id);
      history.push("/positions");
      NotificationHandler.open({
        operation: "success",
        title: "Position deleted successfully",
      });
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to delete the Position",
      });
    }
  };
};

export const positionDetailsInit = () => ({
  type: POSITION_DETAILS_INIT,
});

const setPositionDetails = (payload) => ({
  type: SET_POSITION_DETAILS,
  payload,
});

const setCandidateDetails = (payload) => ({
  type: SET_CANDIDATE_DETAILS,
  payload,
});

const setInterviewDetails = (payload) => ({
  type: SET_INTERVIEW_DETAILS,
  payload,
});
