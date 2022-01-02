import Request from "utils/request";

export const getUpdates = async () => {
  return await Request({
    url: "/api/commonDetail/updates",
    method: "GET",
  });
};

export const getEvents = async () => {
  return await Request({
    url: "/api/commonDetail/upcoming-events",
    method: "GET",
  });
};
