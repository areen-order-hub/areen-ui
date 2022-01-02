const express = require("express");
const services = require("../services/spoc.service");

const router = express.Router();

router.get("", services.list);

router.get("/:spocId", services.fetch);

router.post("", services.create);

router.delete("/:spocId", services.delete);

router.patch("/:spocId", services.update);

module.exports = router;
