import Request from "utils/request";

export const getEmailNotificationConfig = async () => {
  return await Request({
    url: "/api/config/emailNotifications",
    method: "GET",
  });
};

export const updateEmailNotificationConfig = async (
  emailNotificationId,
  data
) => {
  return await Request({
    url: `/api/config/emailNotifications/${emailNotificationId}`,
    method: "PATCH",
    data,
  });
};
