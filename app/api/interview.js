import Request from "utils/request";

export const scheduleInterview = async (interviewDetails) => {
  return await Request({
    url: `/api/interview`,
    method: "POST",
    data: interviewDetails,
  });
};

export const getInterviews = async (params) => {
  return await Request({
    url: `/api/interview`,
    method: "GET",
    params,
  });
};
