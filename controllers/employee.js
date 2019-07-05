exports.getIndex = (req, res, next) => {
  res.render("employee/homepage");
};

exports.getTasks = (req, res, next) => {
  res.render("employee/add-tasks");
};
