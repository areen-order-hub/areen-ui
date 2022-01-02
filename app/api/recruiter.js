import Request from "utils/request";

export const sendInvite = async (userDetails) => {
  return await Request({
    url: "/api/auth/register-via-invite",
    method: "POST",
    data: userDetails,
  });
};

export const fetchUserDetails = async (id) => {
  return await Request({
    url: `/api/recruiter/${id}`,
    method: "GET",
  });
};

export const patchUser = async (id, data) => {
  return await Request({
    url: `/api/recruiter/${id}`,
    method: "PATCH",
    data,
  });
};
