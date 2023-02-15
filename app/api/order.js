import Request from "utils/request";

export const paginateOrders = async (params) => {
  return await Request({
    url: "/api/order/paginate",
    method: "GET",
    params,
  });
};

export const getOrder = async (id) => {
  return await Request({
    url: `/api/order/${id}`,
    method: "GET",
  });
};
