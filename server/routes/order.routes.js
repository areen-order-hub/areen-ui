const express = require("express");
const services = require("../services/order.service");

const router = express.Router();

router.get("/paginate", services.paginate);

module.exports = router;
