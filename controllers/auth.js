const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Task = require("../models/task");

exports.getSignIn = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signin", {
    isAuthenticated: req.session.isLoggedIn,
    errorMessage: message
  });
};

exports.postSignIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/signin");
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid email or password.");
          res.redirect("/signin");
        })
        .catch(err => {
          console.log(err);
          res.redirect("/signin");
        });
    })
    .catch(err => console.log(err));
};

exports.getSignUp = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    isAuthenticated: req.session.isLoggedIn,
    errorMessage: message
  });
};

exports.postSignUp = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const department = req.body.department;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash("error", "Email already exist, please pick a different one.");
        return res.redirect("/signin");
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            department: department,
            tasks: []
          });
          return user.save();
        })
        .then(result => {
          res.redirect("/signin");
        });
    })

    .catch(err => {
      console.log(err);
    });
};

exports.postSignOut = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getAdminSignIn = (req, res, next) => {};

exports.postAdminSignIn = (req, res, next) => {};
