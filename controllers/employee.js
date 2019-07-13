const Task = require("../models/task");
const User = require("../models/user");

exports.getIndex = (req, res, next) => {
  res.render("employee/homepage", {
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.getTasks = (req, res, next) => {
  Task.find({ userId: req.user._id })
    .then(tasks => {
      res.render("employee/add-tasks", {
        isAuthenticated: req.session.isLoggedIn,
        task: tasks
      });
    })
    .catch(err => {
      console.log(err);
    });
};

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
      // console.log("Created a task");
      req.user.tasks.push(result._id);
      return req.user.save();
    })
    .then(result => {
      res.redirect("/add-tasks");
    })
    .catch(err => {
      console.log(err);
    });
};

// exports.postDeleteProduct = (req, res, next) => {
//   const taskId = req.body.taskId;
//   Task.deleteOne({ _id: taskId, userId: req.user._id })
//     .then(tasks => {
//       req.user.tasks = req.user.tasks.splice(
//         req.users.tasks.indexOf(task._id),
//         1
//       );
//       return req.user.save();
//     })
//     .then(result => {
//       console.log(req.user.tasks);
//       res.redirect("/add-tasks");
//     })
//     .catch(err => console.log(err));
// };

exports.postDeleteProduct = (req, res, next) => {
  const taskId = req.body.taskId;
  Task.deleteOne({ _id: taskId, userId: req.user._id })
    .then(() => {
      console.log("Task Deleted!");
      res.redirect("/add-tasks");
    })
    .catch(err => console.log(err));
};
