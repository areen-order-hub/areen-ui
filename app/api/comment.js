import Request from "utils/request";

export const saveComment = async (commentDetails) => {
  return await Request({
    url: `/api/comment`,
    method: "POST",
    data: commentDetails,
  });
};

export const getComments = async (params) => {
  return await Request({
    url: `/api/comment`,
    method: "GET",
    params,
  });
};
