const Request = require("../utils/request");

exports.schedule = async (req, res) => {
  try {
    const url = "/v1/interviews";
    const interview = await Request(
      {
        url,
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(interview);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.list = async (req, res) => {
  try {
    const url = "/v1/interviews/all";
    const interviews = await Request(
      {
        url,
        method: "GET",
        params: req.query,
      },
      req.headers
    );
    res.json(interviews);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
