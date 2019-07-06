const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

router.get("/signin", authController.getSignIn);

router.post("/signin");

router.get("/signup", authController.getSignUp);

router.post("/signup", authController.postSignUp);

router.post("/signout");

module.exports = router;
