exports.getIndex = (req, res, next) => {
  res.render("employee/homepage", {
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.getTasks = (req, res, next) => {
  res.render("employee/add-tasks", {
    isAuthenticated: req.session.isLoggedIn
  });
};
