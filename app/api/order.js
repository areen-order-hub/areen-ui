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

export const triggerProductSync = async () => {
  return await Request({
    url: `/api/order/trigger/productSync`,
    method: "POST",
  });
};

export const triggerInvoiceSync = async () => {
  return await Request({
    url: `/api/order/trigger/invoiceSync`,
    method: "POST",
  });
};

export const triggerOrderSync = async () => {
  return await Request({
    url: `/api/order/trigger/orderSync`,
    method: "POST",
  });
};
