const Request = require("../utils/request");
var FormData = require("form-data");
const { get, forEach } = require("lodash");

exports.uploadOrderFile = async (req, res) => {
  try {
    const { orderId } = req.params;

    let formData = new FormData();
    forEach(get(req, "files", []), (file, index) => {
      const { buffer, originalname: filename, mimetype: contentType } = file;
      formData.append(`file[${index}]`, buffer, { filename, contentType });
    });
    const url = `/v1/file/order/${orderId}`;
    let formDataHeaders = formData.getHeaders();
    let headers = Object.assign({}, req.headers, formDataHeaders);
    const response = await Request(
      {
        url,
        data: formData,
        method: "POST",
      },
      headers
    );
    res.json(response);
  } catch (err) {
    console.log("Error-----", err);
    res.status(err.status).json(err.message);
  }
};

exports.GetFileUrl = async (req, res) => {
  try {
    const { email, path } = req.params;
    const url = `/v1/file/getSingedUrl/${path}/${email}`;
    let headers = req.headers;
    const response = await Request(
      {
        url,
        method: "GET",
      },
      headers
    );
    res.json(response);
  } catch (err) {
    console.log("Error-----", err);
    res.status(err.status).json(err.message);
  }
};
