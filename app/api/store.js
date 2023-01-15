import Request from "utils/request";

export const getStores = async () => {
  return await Request({
    url: "/api/store",
    method: "GET",
  });
};

export const paginateStores = async (params) => {
  return await Request({
    url: "/api/store/paginate",
    method: "GET",
    params,
  });
};

export const getStore = async (id) => {
  return await Request({
    url: `/api/store/${id}`,
    method: "GET",
  });
};

export const addStore = async (storeDetails) => {
  return await Request({
    url: `/api/store`,
    method: "POST",
    data: storeDetails,
  });
};

export const editStore = async (id, storeDetails) => {
  return await Request({
    url: `/api/store/${id}`,
    method: "PATCH",
    data: storeDetails,
  });
};

export const deleteStore = async (id) => {
  return await Request({
    url: `/api/store/${id}`,
    method: "DELETE",
  });
};
