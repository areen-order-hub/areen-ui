const express = require("express");
const services = require("../services/role.service");

const router = express.Router();

router.get("/paginate", services.paginate);

router.get("", services.list);

router.get("/:roleId", services.fetch);

router.post("", services.create);

router.patch("/:roleId", services.update);

module.exports = router;
