import Request from "utils/request";

export const uploadOrderFiles = async (formData, orderId) => {
  return await Request({
    url: `/api/file/order/${orderId}`,
    method: "POST",
    data: formData,
  });
};

export const getOrderFiles = async (orderId) => {
  return await Request({
    url: `/api/file/order/${orderId}`,
    method: "GET",
  });
};

export const deleteOrderFile = async (orderId, data) => {
  return await Request({
    url: `/api/file/order/${orderId}`,
    method: "DELETE",
    data,
  });
};

export const downloadFile = async (path, fileKey) => {
  return await Request({
    url: `/api/file/download/${path}/${fileKey}`,
    method: "GET",
  });
};
