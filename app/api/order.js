import Request from "utils/request";

export const paginateOrders = async (params) => {
  return await Request({
    url: "/api/order/paginate",
    method: "GET",
    params,
  });
};

export const bulkCreate = async (data) => {
  return await Request({
    url: "/api/order/bulk",
    method: "POST",
    data,
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

export const createAreenShipment = async (data) => {
  return await Request({
    url: `/api/order/carrier/areen`,
    method: "POST",
    data,
  });
};

export const createBeeThereShipment = async (data) => {
  return await Request({
    url: `/api/order/carrier/beeThere`,
    method: "POST",
    data,
  });
};

export const createEliteShipment = async (data) => {
  return await Request({
    url: `/api/order/carrier/elite`,
    method: "POST",
    data,
  });
};

export const cancelShipment = async (orderId) => {
  return await Request({
    url: `/api/order/carrier/${orderId}`,
    method: "DELETE",
  });
};
