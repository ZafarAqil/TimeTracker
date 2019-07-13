const express = require("express");

const router = express.Router();

router.get("/admin/add-tasks");

router.post("/admin/add-tasks");

router.get("/admin/show-user");

//add a route for excel export later

module.exports = router;
