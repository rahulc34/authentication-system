const express = require("express");
const registerUser = require("../controllers/register");
const handleLogin = require("../controllers/login");
const handleForgetPassword = require("../controllers/ForgetPassword");
const verifyOtp = require("../controllers/verifyOtp");
const getOtpTime = require("../controllers/getOtpTime");
const updatePassword = require("../controllers/passwordUpdate");
const getAccess = require('../controllers/getAccess')

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", handleLogin);
router.post("/forget/password", handleForgetPassword);
router.post("/otp/verify", verifyOtp);
router.post("/otp/time", getOtpTime);
router.post("/password/update", updatePassword);
router.post('/get/access',getAccess)

module.exports = router;
