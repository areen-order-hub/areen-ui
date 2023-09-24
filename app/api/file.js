import Request from "utils/request";

export const uploadOrderFile = async (formData, orderId) => {
  return await Request({
    url: `/api/file/order/${orderId}`,
    method: "POST",
    data: formData,
  });
};

export const downloadFile = async (path, fileKey) => {
  return await Request({
    url: `/api/file/download/${path}/${fileKey}`,
    method: "GET",
  });
};
