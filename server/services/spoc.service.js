const Request = require("../utils/request");

exports.list = async (req, res) => {
  try {
    const url = "/v1/spocs/all";
    const spocs = await Request(
      {
        url,
        method: "GET",
        params: req.query,
      },
      req.headers
    );
    res.json(spocs);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const url = "/v1/spocs";
    const spoc = await Request(
      {
        url,
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(spoc);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { spocId } = req.params;
    const url = `/v1/spocs/${spocId}`;

    const spoc = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(spoc);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { spocId } = req.params;
    const url = `/v1/spocs/${spocId}`;

    const spoc = await Request(
      {
        url,
        method: "PATCH",
        data: req.body,
      },
      req.headers
    );
    res.json(spoc);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const { spocId } = req.params;
    const url = `/v1/spocs/${spocId}`;

    const spoc = await Request(
      {
        url,
        method: "DELETE",
      },
      req.headers
    );
    res.json(spoc);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
