const Request = require("../utils/request");
const { oAuthConfig } = require("../config");

exports.getOAuthConfig = async (req, res) => {
  res.json(oAuthConfig);
};

exports.register = async (req, res, next) => {
  try {
    var data = await Request({
      url: "/v1/auth/register",
      data: req.body,
      method: "POST",
    });
    res.json(data);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.registerViaInvite = async (req, res, next) => {
  try {
    var data = await Request({
      url: "/v1/auth/register-via-invite",
      data: req.body,
      method: "POST",
    });
    res.json(data);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.verifyEmailCode = async (req, res, next) => {
  try {
    var data = await Request({
      url: "/v1/auth/verify-code",
      data: req.body,
      method: "POST",
    });
    req.user = data;
    next();
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.login = async (req, res, next) => {
  try {
    var data = await Request({
      url: "/v1/auth/login",
      data: req.body,
      method: "POST",
    });
    req.user = data;
    next();
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.sendPasswordReset = async (req, res, next) => {
  try {
    var data = await Request({
      url: "/v1/auth/send-password-reset",
      data: req.body,
      method: "POST",
    });
    res.json();
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    var data = await Request({
      url: "v1/auth/reset-password",
      data: req.body,
      method: "POST",
    });
    res.json();
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
exports.oAuthLogin = async (req, res, next) => {
  try {
    var { loginType } = req.params;
    var data = await Request({
      url: `/v1/auth/${loginType}`,
      method: "POST",
      data: req.body,
    });
    req.user = data;
    next();
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.refreshExpiredToken = async (body) => {
  var data = await Request({
    data: body,
    method: "POST",
    url: "/v1/auth/refresh-token",
  });
  return data;
};

exports.resendEmailCode = async (req, res, next) => {
  try {
    var data = await Request({
      url: "/v1/auth/resend-verification",
      method: "POST",
      data: req.body,
    });
    res.json(data);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
