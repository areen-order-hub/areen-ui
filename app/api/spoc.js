import Request from "utils/request";

export const getSpocs = async (params = {}) => {
  return await Request({
    url: "/api/spoc",
    method: "GET",
    params,
  });
};

export const getSpoc = async (id) => {
  return await Request({
    url: `/api/spoc/${id}`,
    method: "GET",
  });
};

export const addSpocApi = async (spocDetails) => {
  return await Request({
    url: `/api/spoc`,
    method: "POST",
    data: spocDetails,
  });
};

export const editSpocApi = async (id, spocDetails) => {
  return await Request({
    url: `/api/spoc/${id}`,
    method: "PATCH",
    data: spocDetails,
  });
};

export const deleteSpocApi = async (id) => {
  return await Request({
    url: `/api/spoc/${id}`,
    method: "DELETE",
  });
};
