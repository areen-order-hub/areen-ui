const express = require("express");
const services = require("../services/candidate.service");

const router = express.Router();

router.get("", services.list);

router.get("/fields", services.getFields);

router.get("/:candidateId", services.fetch);

router.post("", services.create);

router.delete("/:candidateId", services.delete);

router.patch("/:candidateId", services.update);

module.exports = router;
