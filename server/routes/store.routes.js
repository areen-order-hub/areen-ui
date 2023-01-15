const express = require("express");
const services = require("../services/store.service");

const router = express.Router();

router.get("/paginate", services.paginate);

router.get("", services.list);

router.get("/:storeId", services.fetch);

router.post("", services.create);

router.delete("/:storeId", services.delete);

router.patch("/:storeId", services.update);

module.exports = router;
