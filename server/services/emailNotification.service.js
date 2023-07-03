exports.findOne = async (req, res) => {
  try {
    const url = `/v1/config/emailNotifications`;

    const emailNotification = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(emailNotification);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { emailNotificationId } = req.params;
    const url = `/v1/config/emailNotifications/${emailNotificationId}`;

    const emailNotification = await Request(
      {
        url,
        method: "PATCH",
        data: req.body,
      },
      req.headers
    );
    res.json(emailNotification);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
