const Request = require("../utils/request");

exports.listForDashboard = async (req, res) => {
  try {
    const url = "/v1/commonDetails/dashboard";
    const details = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(details);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.getUpdates = async (req, res) => {
  try {
    const url = "/v1/commonDetails/updates";
    const updates = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(updates);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetchUpcomingEvents = async (req, res) => {
  try {
    const url = "/v1/commonDetails/upcoming-events";
    const events = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(events);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
