const express = require("express");
const service = require("../services/comment.service");

const router = express.Router();

router.get("", service.list);
router.post("", service.create);

module.exports = router;
