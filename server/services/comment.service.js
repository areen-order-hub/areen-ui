const Request = require("../utils/request");

exports.list = async (req, res) => {
  try {
    const url = "/v1/comment/all";
    const comments = await Request(
      {
        url,
        method: "GET",
        params: req.query,
      },
      req.headers
    );
    res.json(comments);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const url = "/v1/comment";
    const comment = await Request(
      {
        url,
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(comment);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
