const Request = require("../utils/request");

exports.list = async (req, res) => {
  try {
    const url = "/v1/role/all";
    const roles = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(roles);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.paginate = async (req, res) => {
  try {
    const roles = await Request(
      {
        url: "/v1/role/paginate",
        method: "GET",
        params: req.query,
      },
      req.headers
    );
    res.json(roles);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const url = "/v1/role";
    const role = await Request(
      {
        url,
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(role);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { roleId } = req.params;
    const url = `/v1/role/${roleId}`;

    const role = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(role);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { roleId } = req.params;
    const url = `/v1/role/${roleId}`;

    const role = await Request(
      {
        url,
        method: "PATCH",
        data: req.body,
      },
      req.headers
    );
    res.json(role);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const { roleId } = req.params;
    const url = `/v1/role/${roleId}`;

    const role = await Request(
      {
        url,
        method: "DELETE",
      },
      req.headers
    );
    res.json(role);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
