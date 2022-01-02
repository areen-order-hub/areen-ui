const Request = require("../utils/request");

exports.list = async (req, res) => {
  try {
    const url = `/v1/candidates/all`;
    const candidates = await Request(
      {
        url,
        method: "GET",
        params: req.query,
      },
      req.headers
    );
    res.json(candidates);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.getFields = async (req, res) => {
  try {
    const url = "/v1/candidates/fields";
    const fields = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(fields);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const url = "/v1/candidates";
    const candidate = await Request(
      {
        url,
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(candidate);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const url = `/v1/candidates/${candidateId}`;

    const candidate = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(candidate);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const url = `/v1/candidates/${candidateId}`;

    const candidate = await Request(
      {
        url,
        method: "PATCH",
        data: req.body,
      },
      req.headers
    );
    res.json(candidate);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const url = `/v1/candidates/${candidateId}`;

    const candidate = await Request(
      {
        url,
        method: "DELETE",
      },
      req.headers
    );
    res.json(candidate);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
