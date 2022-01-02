import Request from "utils/request";

export const resetUser = async (userDetails) => {
  return await Request({
    url: "/api/auth/send-password-reset",
    method: "POST",
    data: userDetails,
  });
};
