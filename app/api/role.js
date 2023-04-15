import Request from "utils/request";

export const paginateRoles = async (params) => {
  return await Request({
    url: "/api/role/paginate",
    method: "GET",
    params,
  });
};

export const addRole = async (data) => {
  return await Request({
    url: "/api/role",
    method: "POST",
    data,
  });
};

export const getRole = async (id) => {
  return await Request({
    url: `/api/role/${id}`,
    method: "GET",
  });
};

export const editRole = async (id, data) => {
  return await Request({
    url: `/api/role/${id}`,
    method: "PATCH",
    data,
  });
};
