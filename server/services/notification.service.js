const Request = require("../utils/request");

exports.list = async (req, res) => {
  try {
    const notifications = await Request(
      {
        url: `/v1/notification/all`,
        method: "GET",
      },
      req.headers
    );
    res.json(notifications);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetchTopNotifications = async (req, res) => {
  try {
    const { perPage } = req.query;
    const notifications = await Request(
      {
        url: `/v1/notification/all?perPage=${perPage}`,
        method: "GET",
      },
      req.headers
    );
    res.json(notifications);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.updateOne = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const data = await Request(
      {
        url: `/v1/notification/${notificationId}`,
        method: "PATCH",
        data: req.body,
      },
      req.headers
    );
    res.json(data);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
