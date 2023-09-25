const express = require("express");
const service = require("../services/file.service");

const router = express.Router();

router.post("/order/:orderId", service.uploadOrderFiles);
router.get("/order/:orderId", service.getOrderFiles);
router.delete("/order/:orderId", service.deleteOrderFile);
router.get("/download/:path/:email", service.GetFileUrl);

module.exports = router;
