const express = require("express");

const router = express.Router();

const employeeController = require("../controllers/employee");

router.get("/", employeeController.getIndex); //for homepage

router.get("/add-tasks"); //to view project tasks list

router.post("/add-tasks"); //to add project tasks

router.post("/edit-task"); //to edit a task

router.post("/delete-task"); //to delete a task

module.exports = router;
