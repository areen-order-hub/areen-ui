import Request from "utils/request";

export const getNotifications = async () => {
  return await Request({
    url: `/api/dashboard/notification?perPage=${6}`,
    method: "GET",
  });
};

export const markRead = async (id, status) => {
  return await Request({
    url: `/api/notification/${id}`,
    method: "PATCH",
    data: status,
  });
};
