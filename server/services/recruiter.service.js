const Request = require("../utils/request");

exports.fetch = async (req, res) => {
  try {
    const { userId } = req.params;
    const url = `/v1/recruiters/${userId}`;

    const user = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(user);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { userId } = req.params;
    const url = `/v1/recruiters/${userId}`;

    const user = await Request(
      {
        url,
        method: "PATCH",
        data: req.body,
      },
      req.headers
    );
    res.json(user);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
