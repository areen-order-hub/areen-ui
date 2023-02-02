const express = require("express");
const services = require("../services/order.service");

const router = express.Router();

router.get("/paginate", services.paginate);
router.get("/:orderId", services.fetch);
router.post("/trigger/productSync", services.syncProducts);
router.post("/trigger/invoiceSync", services.syncInvoices);
router.post("/trigger/orderSync", services.syncOrders);

router.post("/carrier/areen", services.createAreenShipment);
router.post("/carrier/beeThere", services.createBeeThereShipment);
router.post("/carrier/elite", services.createEliteShipment);

module.exports = router;
