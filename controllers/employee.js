const Task = require("../models/task");
const User = require("../models/user");

exports.getIndex = (req, res, next) => {
  res.render("employee/homepage", {
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.getTasks = (req, res, next) => {
  Task.find({ userId: req.user._id })
    .populate("userId")
    .then(tasks => {
      console.log(tasks);
      res.render("employee/add-tasks", {
        isAuthenticated: req.session.isLoggedIn,
        task: tasks
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// res.render("employee/add-tasks", {
//   isAuthenticated: req.session.isLoggedIn
// });

exports.postTasks = (req, res, next) => {
  const title = req.body.title;
  const date = req.body.date;
  const time = req.body.time;
  const task = new Task({
    title: title,
    date: date,
    time: time,
    userId: req.user
  });
  task
    .save()
    .then(result => {
      console.log("Created a task");
      res.redirect("/add-tasks");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  // const prodId = req.body.productId;
  Task.deleteOne({ userId: req.user._id })
    .then(() => {
      console.log("Task Deleted!");
      res.redirect("/add-tasks");
    })
    .catch(err => console.log(err));
};
