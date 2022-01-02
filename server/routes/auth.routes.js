const express = require("express");
const service = require("../services/auth.service");
const session = require("../middlewares/sessionManager");
const router = express.Router();

router.get("", session.isActive);

router.get("/logout", session.logout);

router.post("/register", service.register);

router.post("/register-via-invite", service.registerViaInvite);

router.post("/email-verify", service.verifyEmailCode, session.setDetails);

router.post("/login", service.login, session.setDetails);

router.post("/send-password-reset", service.sendPasswordReset);

router.post("/reset-password", service.changePassword);

router.post("/login/:loginType", service.oAuthLogin, session.setDetails);

router.get("/config", service.getOAuthConfig);

router.post("/resend-code", service.resendEmailCode);

module.exports = router;
