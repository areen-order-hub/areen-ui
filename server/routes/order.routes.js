const express = require("express");
const services = require("../services/order.service");

const router = express.Router();

router.get("/paginate", services.paginate);
router.get("/:orderId", services.fetch);

module.exports = router;
