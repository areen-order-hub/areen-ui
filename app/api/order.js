import Request from "utils/request";

export const paginateOrders = async (params) => {
  return await Request({
    url: "/api/order/paginate",
    method: "GET",
    params,
  });
};
