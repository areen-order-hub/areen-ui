const express = require("express");
const services = require("../services/emailNotification.service");

const router = express.Router();

router.get("", services.findOne);
router.patch("/:emailNotificationId", services.update);

module.exports = router;
