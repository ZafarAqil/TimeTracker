const User = require("../models/user");

exports.getSignIn = (req, res, next) => {
  res.render("auth/signin");
};

exports.getSignUp = (req, res, next) => {
  res.render("auth/signup");
};

exports.postSignUp = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const department = req.body.department;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect("/signin");
      }
      const user = new User({
        name: name,
        email: email,
        password: password,
        department: department
      });
      return user.save();
    })
    .then(result => {
      res.redirect("/signin");
    })
    .catch(err => {
      console.log(err);
    });
};
