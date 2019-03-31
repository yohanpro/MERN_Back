const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

//Load Profie Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

router.get("/test", (req, res) => {
  res.json({ msg: "profile work" });
});

/*
  @route GET/api/profile
  @desc Get 현재 유저의 Profile을 가져온다.
  @access private
 */

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "이 유저는 Profile이 없습니다.";
          res.status(404).send(errors);
        } else {
          res.json(profile);
        }
      })
      .catch(e => res.send(404).json(e));
  }
);

/*
  @route POST /api/profile
  @desc User의 Profile 생성
  @access private
 */

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.hanlde = req.body.handle;
    if (req.body.compnay) profileFields.compnay = req.body.compnay;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    if (typeof req.body.skills !== undefined) {
      profileFields.skills = req.body.skills.split(",");
    }
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then(profile => res.json(profile))
          .catch(e => console.log(e));
      } else {
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "이 handle은 이미 있습니다";
            res.status(400).json(errors);
          }
          // Profile save
          new Profile(profileFields).save().then(profile => {
            res.json(profile);
          });
        });
      }
    });
  }
);

module.exports = router;
