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

exports.fetch = async (req, res) => {
  try {
    const { orderId } = req.params;
    const url = `/v1/order/${orderId}`;

    const order = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(order);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.syncProducts = async (req, res) => {
  try {
    const url = `/v1/order/trigger/productSync`;

    const order = await Request(
      {
        url,
        method: "POST",
      },
      req.headers
    );
    res.json(order);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.syncInvoices = async (req, res) => {
  try {
    const url = `/v1/order/trigger/invoiceSync`;

    const order = await Request(
      {
        url,
        method: "POST",
      },
      req.headers
    );
    res.json(order);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.syncOrders = async (req, res) => {
  try {
    const url = `/v1/order/trigger/orderSync`;

    const order = await Request(
      {
        url,
        method: "POST",
      },
      req.headers
    );
    res.json(order);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.createBeeThereShipment = async (req, res) => {
  try {
    const url = `/v1/order/carrier/beeThere`;
    const data = await Request(
      {
        url,
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(data);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
