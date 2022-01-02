import Request from "utils/request";

export const getClients = async () => {
  return await Request({
    url: "/api/client",
    method: "GET",
  });
};

export const getClient = async (id) => {
  return await Request({
    url: `/api/client/${id}`,
    method: "GET",
  });
};

export const addClientApi = async (clientDetails) => {
  return await Request({
    url: `/api/client`,
    method: "POST",
    data: clientDetails,
  });
};

export const editClientApi = async (id, clientDetails) => {
  return await Request({
    url: `/api/client/${id}`,
    method: "PATCH",
    data: clientDetails,
  });
};

export const getClientsForPosition = async () => {
  return await Request({
    url: `/api/client?fields=name,superAccHolder,spocDetails`,
    method: "GET",
  });
};

export const deleteClient = async (id) => {
  return await Request({
    url: `/api/client/${id}`,
    method: "DELETE",
  });
};
