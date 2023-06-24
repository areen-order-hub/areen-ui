import Request from "utils/request";

export const paginateOrders = async (params) => {
  return await Request({
    url: "/api/order/paginate",
    method: "GET",
    params,
  });
};

export const getCarrierStatus = async () => {
  return await Request({
    url: "/api/order/carrierStatusOptions",
    method: "GET",
  });
};

export const getFilterCount = async (params) => {
  return await Request({
    url: "/api/order/filterCount",
    method: "GET",
    params,
  });
};

export const getOrdersForExport = async (params) => {
  return await Request({
    url: "/api/order/export",
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

export const createOrder = async (data) => {
  return await Request({
    url: `/api/order`,
    method: "POST",
    data,
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

export const handleDelivery = async (data) => {
  return await Request({
    url: `/api/order/delivery`,
    method: "POST",
    data,
  });
};

export const deleteOrder = async (orderId) => {
  return await Request({
    url: `/api/order/${orderId}`,
    method: "DELETE",
  });
};
