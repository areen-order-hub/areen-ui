const express = require("express");
const services = require("../services/interview.service");

const router = express.Router();

router.post("", services.schedule);
router.get("", services.list)

module.exports = router;
