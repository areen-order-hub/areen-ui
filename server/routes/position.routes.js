const express = require("express");
const services = require("../services/position.service");

const router = express.Router();

router.get("", services.list);

router.get("/assignedByMe", services.fetchAssignedByMe);

router.get("/:positionId", services.fetch);

router.post("", services.create);

router.delete("/:positionId", services.delete);

router.patch("/:positionId", services.update);

module.exports = router;
