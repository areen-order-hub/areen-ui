import Request from "utils/request";

export const uploadFile = async (formData, path, fileKey) => {
  return await Request({
    url: `/api/file/upload/${path}/${fileKey}`,
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
