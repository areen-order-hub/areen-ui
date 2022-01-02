import Request from "utils/request";

export const changeUserPassword = async (userDetails) => {
  return await Request({
    url: "/api/auth/reset-password",
    method: "POST",
    data: userDetails,
  });
};
