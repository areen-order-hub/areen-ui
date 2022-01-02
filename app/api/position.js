import Request from "utils/request";

export const getPositions = async (params) => {
  return await Request({
    url: "/api/position",
    method: "GET",
    params,
  });
};

export const getAssignedByMe = async (params) => {
  return await Request({
    url: "/api/position/assignedByMe",
    method: "GET",
    params,
  });
};

export const getPosition = async (id) => {
  return await Request({
    url: `/api/position/${id}`,
    method: "GET",
  });
};

export const addPositionApi = async (positionDetails) => {
  return await Request({
    url: `/api/position`,
    method: "POST",
    data: positionDetails,
  });
};

export const editPositionApi = async (id, positionDetails) => {
  return await Request({
    url: `/api/position/${id}`,
    method: "PATCH",
    data: positionDetails,
  });
};

export const deletePosition = async (id) => {
  return await Request({
    url: `/api/position/${id}`,
    method: "DELETE",
  });
};
