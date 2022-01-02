import Request from "utils/request";

export const getRecruiters = async () => {
  return await Request({
    url: "/api/user",
    method: "GET",
  });
};
