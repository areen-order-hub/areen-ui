const express = require("express");
const services = require("../services/client.service");

const router = express.Router();

router.get("", services.list);

router.get("/:clientId", services.fetch);

router.post("", services.create);

router.delete("/:clientId", services.delete);

router.patch("/:clientId", services.update);

module.exports = router;
