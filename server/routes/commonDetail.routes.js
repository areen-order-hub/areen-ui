const express = require("express");
const services = require("../services/commonDetail.service");

const router = express.Router();

router.get("/dashboard", services.listForDashboard);
router.get("/updates", services.getUpdates);
router.get("/upcoming-events", services.fetchUpcomingEvents);

module.exports = router;
