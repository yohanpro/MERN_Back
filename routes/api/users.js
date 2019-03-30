const User = require("../../models/User");
const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const router = express.Router();

// @route GET api/users/test
// Test users
router.get("/test", (req, res) => {
  res.json({ msg: "users work" });
});

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already Exists" });
    } else {
      console.log(user);
      const avatar = gravatar.url(req.body.email, {
        s: 200, //size,
        r: "pg", //
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
        // avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        console.log(salt);
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route GET/api/users/login
// @desc Login/user /Returnng JWT
// @access public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    // user의 Email이 없을 경우에는 404로 return해준다.
    if (!user) {
      return res.status(404).json({ email: "User을 찾지 못했습니다. ㅠㅠ" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        return res
          .status(400)
          .json({ password: "ID, Password를 다시 한번 확인해 주세요" });
      } else {
        const payload = { id: user.id, name: user.name };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({
      id: req.user.id,
      name: req.user.name,
      password: req.user.password,
      email: req.user.email
    });
  }
);
module.exports = router;
