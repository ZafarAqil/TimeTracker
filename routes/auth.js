const express = require("express");

const router = express.Router();

router.get("/login");

router.post("/login");

router.get("/signup");

router.post("/signup");

module.exports = router;