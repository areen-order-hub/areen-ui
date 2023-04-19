const express = require("express");
const services = require("../services/order.service");

const router = express.Router();

router.get("/paginate", services.paginate);
router.post("/bulk", services.bulkCreate);
router.get("", services.list);
router.get("/:orderId", services.fetch);
router.post("/trigger/productSync", services.syncProducts);
router.post("/trigger/invoiceSync", services.syncInvoices);
router.post("/trigger/orderSync", services.syncOrders);

router.post("/carrier/areen", services.createAreenShipment);
router.post("/carrier/beeThere", services.createBeeThereShipment);
router.post("/carrier/elite", services.createEliteShipment);
router.delete("/carrier/:orderId", services.cancelShipment);

router.post("/delivery", services.handleDelivery);

module.exports = router;
