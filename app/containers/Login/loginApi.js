import Request from "utils/request";

export const loginUser = async (userDetails) => {
  return await Request({
    url: "/api/auth/login",
    method: "POST",
    data: userDetails,
  });
};
