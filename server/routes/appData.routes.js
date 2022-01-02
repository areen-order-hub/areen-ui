const express = require("express");
const router = express.Router();
const { GetRoles,GetSkills } = require("../services/appData")
router.get('/roles',GetRoles );
router.get('/skills', GetSkills);

module.exports = router;