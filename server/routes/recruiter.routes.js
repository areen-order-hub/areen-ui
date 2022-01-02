const express = require("express");
const services = require("../services/recruiter.service");
const router = express.Router();

router.get("/:userId", services.fetch);
router.patch("/:userId", services.update);
module.exports = router;
