const Request = require("../utils/request");

exports.list = async (req, res) => {
  try {
    const url = "/v1/store/all";
    const stores = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(stores);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.paginate = async (req, res) => {
  try {
    const stores = await Request(
      {
        url: "/v1/store/paginate",
        method: "GET",
        params: req.query,
      },
      req.headers
    );
    res.json(stores);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const url = "/v1/store";
    const store = await Request(
      {
        url,
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(store);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { storeId } = req.params;
    const url = `/v1/store/${storeId}`;

    const store = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(store);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { storeId } = req.params;
    const url = `/v1/store/${storeId}`;

    const store = await Request(
      {
        url,
        method: "PATCH",
        data: req.body,
      },
      req.headers
    );
    res.json(store);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const { storeId } = req.params;
    const url = `/v1/store/${storeId}`;

    const store = await Request(
      {
        url,
        method: "DELETE",
      },
      req.headers
    );
    res.json(store);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
