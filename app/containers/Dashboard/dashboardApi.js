import Request from "utils/request";

export const downloadFile = async (email) => {
  return await Request({
    url: `/api/file/download/profile/${email}`,
    method: "GET",
  });
};
export const getDashboardDetails = async () => {
  return await Request({
    url: `/api/commonDetail/dashboard`,
    method: "GET",
  });
};
