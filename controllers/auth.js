const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Task = require("../models/task");

exports.getSignIn = (req, res, next) => {
  res.render("auth/signin", {
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postSignIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
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
  res.render("auth/signup", { isAuthenticated: req.session.isLoggedIn });
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
