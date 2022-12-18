const express = require("express");
const session = require("../middlewares/sessionManager");
const authRoutes = require("./auth.routes");
const fileRoutes = require("./file.routes");
const userRoutes = require("./user.routes");
const authorisedRoutes = require("./authorised.routes");
const appDataRoutes = require("./appData.routes");
const clientRoutes = require("./client.routes");
const spocRoutes = require("./spoc.routes");
const candidateRoutes = require("./candidate.routes");
const positionRoutes = require("./position.routes");
const interviewRoutes = require("./interview.routes");
const commonDetailRoutes = require("./commonDetail.routes");
const recruiterRoutes = require("./recruiter.routes");

const storeRoutes = require("./store.routes");

const multer = require("multer");
var storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, "");
  },
});

var upload = multer({ storage: storage }).single("file");
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/file", upload, session.protected, fileRoutes);
router.use("/user", session.protected, userRoutes);
router.use("/appData", appDataRoutes);
router.use("/client", session.protected, clientRoutes);
router.use("/spoc", session.protected, spocRoutes);
router.use("/candidate", session.protected, candidateRoutes);
router.use("/position", session.protected, positionRoutes);
router.use("/interview", session.protected, interviewRoutes);
router.use("/commonDetail", session.protected, commonDetailRoutes);
router.use("/recruiter", session.protected, recruiterRoutes);

router.use("/store", session.protected, storeRoutes);

router.use("", session.protected, authorisedRoutes);

module.exports = router;
