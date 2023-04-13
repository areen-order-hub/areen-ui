import Request from "utils/request";

export const paginateUsers = async (params) => {
  return await Request({
    url: "/api/user/paginate",
    method: "GET",
    params,
  });
};

export const sendInvite = async (userDetails) => {
  return await Request({
    url: "/api/auth/register-via-invite",
    method: "POST",
    data: userDetails,
  });
};
