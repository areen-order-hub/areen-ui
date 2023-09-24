const express = require("express");
const service = require("../services/file.service");

const router = express.Router();

router.post('/order/:orderId', service.uploadOrderFile);
router.get('/download/:path/:email', service.GetFileUrl);


module.exports = router;