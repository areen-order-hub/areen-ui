const Request = require("../utils/request");

exports.paginate = async (req, res) => {
  try {
    const orders = await Request(
      {
        url: "/v1/order/paginate",
        method: "GET",
        params: req.query,
      },
      req.headers
    );
    res.json(orders);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
