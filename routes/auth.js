const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

router.get("/signin", authController.getSignIn);

router.post("/signin", authController.postSignIn);

router.get("/signup", authController.getSignUp);

router.post("/signup", authController.postSignUp);

router.post("/signout", authController.postSignOut);

router.get("/admin/signin");

router.post("/admin/signin");

router.post("/admin/signout");

module.exports = router;
