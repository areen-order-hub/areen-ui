const express = require("express");
const services = require("../services/order.service");

const router = express.Router();

router.get("/paginate", services.paginate);
router.get("/:orderId", services.fetch);
router.post("/trigger/productSync", services.syncProducts);
router.post("/trigger/invoiceSync", services.syncInvoices);
router.post("/trigger/orderSync", services.syncOrders);

router.post("/carrier/beeThere", services.createBeeThereShipment);

module.exports = router;
