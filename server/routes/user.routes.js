const express = require("express");
const services = require("../services/user.service");

const router = express.Router();

router.get("", services.list);

router.get("/:userId", services.GetUser);

router.patch("/:userId", services.UpdateUser);

module.exports = router;
