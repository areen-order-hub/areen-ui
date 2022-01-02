const Request = require("../utils/request");

exports.list = async (req, res) => {
  try {
    const { fields } = req.query;
    const url = fields ? `/v1/clients/all?fields=${fields}` : "/v1/clients/all";
    const clients = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(clients);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const url = "/v1/clients";
    const client = await Request(
      {
        url,
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(client);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { clientId } = req.params;
    const url = `/v1/clients/${clientId}`;

    const client = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(client);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { clientId } = req.params;
    const url = `/v1/clients/${clientId}`;

    const client = await Request(
      {
        url,
        method: "PATCH",
        data: req.body,
      },
      req.headers
    );
    res.json(client);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const { clientId } = req.params;
    const url = `/v1/clients/${clientId}`;

    const client = await Request(
      {
        url,
        method: "DELETE",
      },
      req.headers
    );
    res.json(client);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
