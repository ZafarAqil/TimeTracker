exports.getSignIn = (req, res, next) => {
  res.render("auth/signin");
};

exports.getSignUp = (req, res, next) => {
  res.render("auth/signup");
};
