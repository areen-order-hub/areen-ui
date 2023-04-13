import Request from "utils/request";

export const paginateUsers = async (params) => {
  return await Request({
    url: "/api/user/paginate",
    method: "GET",
    params,
  });
};
