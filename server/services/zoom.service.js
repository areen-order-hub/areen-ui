const Request = require("../utils/request");
const qs = require("query-string");

exports.token = async (req, res) => {
  try {
    const response = await Request({
      url: `/v1/zoom/token?${qs.stringify(req.query)}`
    }, req.headers);
    res.send(response);
  }
  catch (err) {
    res.status(err.status).json(err.message);
  }
}