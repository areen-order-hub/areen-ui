import Request from "utils/request";

export const getCandidates = async (params) => {
  return await Request({
    url: "/api/candidate",
    method: "GET",
    params,
  });
};

export const getFields = async () => {
  return await Request({
    url: "/api/candidate/fields",
    method: "GET",
  });
};

export const fetchCandidateDetails = async (id) => {
  return await Request({
    url: `/api/candidate/${id}`,
    method: "GET",
  });
};

export const addCandidateApi = async (candidateDetails) => {
  return await Request({
    url: `/api/candidate`,
    method: "POST",
    data: candidateDetails,
  });
};

export const editCandidateApi = async (id, candidateDetails) => {
  return await Request({
    url: `/api/candidate/${id}`,
    method: "PATCH",
    data: candidateDetails,
  });
};

export const deleteCandidate = async (id) => {
  return await Request({
    url: `/api/candidate/${id}`,
    method: "DELETE",
  });
};
