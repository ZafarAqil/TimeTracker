const express = require("express");

const router = express.Router();

const employeeController = require("../controllers/employee");
const isAuth = require("../middleware/is-auth");

router.get("/", employeeController.getIndex); //for homepage

router.get("/add-tasks", isAuth, employeeController.getTasks); //to view project tasks list

router.post("/add-tasks", isAuth, employeeController.postTasks);

// router.post("/edit-task"); // to edit a task

router.post("/delete-task", isAuth, employeeController.postDeleteProduct); //to delete a task

module.exports = router;
