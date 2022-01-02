const Request = require("../utils/request");

exports.list = async (req, res) => {
  try {
    const url = "/v1/positions/all";
    const positions = await Request(
      {
        url,
        method: "GET",
        params: req.query,
      },
      req.headers
    );
    res.json(positions);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetchAssignedByMe = async (req, res) => {
  try {
    const url = "/v1/positions/assignedByMe";
    const positions = await Request(
      {
        url,
        method: "GET",
        params: req.query,
      },
      req.headers
    );
    res.json(positions);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const url = "/v1/positions";
    const position = await Request(
      {
        url,
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(position);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { positionId } = req.params;
    const url = `/v1/positions/${positionId}`;

    const position = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(position);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { positionId } = req.params;
    const url = `/v1/positions/${positionId}`;

    const position = await Request(
      {
        url,
        method: "PATCH",
        data: req.body,
      },
      req.headers
    );
    res.json(position);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const { positionId } = req.params;
    const url = `/v1/positions/${positionId}`;

    const position = await Request(
      {
        url,
        method: "DELETE",
      },
      req.headers
    );
    res.json(position);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
