const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { validationResult, body, check } = require("express-validator");
const authenticate = require("../../middleware/authenticate");
const Profile = require("../../modal/Profile");
// Route: Get  api/profile/test
// Access public
router.get("/test", (req, res) => res.json({ msg: "profile works" }));

// Route 1: Get  api/profile/
//Get current user profile
// Access private

router.get("/", authenticate, async (req, res) => {
  //If there are errors then throw a bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userProfile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!userProfile) {
      return res.status(404).send({ errors: "No Such user profile found" });
    }
    res.json(userProfile);
  } catch (error) {
    console.log(error);
  }
});
// Route 2: Post  api/profile/
// Create or Edit user profile
// Access private

router.post(
  "/",
  authenticate,

  async (req, res) => {
    //If there are errors then throw a bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profileFields = {};
      profileFields.user = req.user.id;
      if (req.body.handle) {
        profileFields.handle = req.body.handle;
      }
      if (req.body.status) {
        profileFields.status = req.body.status;
      }
      if (req.body.gitUsername) {
        profileFields.gitUsername = req.body.gitUsername;
      }
      if (req.body.company) {
        profileFields.company = req.body.company;
      }
      if (req.body.website) {
        profileFields.website = req.body.website;
      }
      if (req.body.location) {
        profileFields.location = req.body.location;
      }
      if (req.body.bio) {
        profileFields.bio = req.body.bio;
      }

      //Get skills array
      if (typeof req.body.skills !== "undefined") {
        profileFields.skills = req.body.skills;
      }

      //Get social links
      profileFields.social = {};

      if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
      if (req.body.linkedIn) profileFields.social.linkedIn = req.body.linkedIn;
      if (req.body.instagram)
        profileFields.social.instagram = req.body.instagram;

      Profile.findOne({ user: req.user.id }).then((profile) => {
        if (profile) {
          //Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then((profile) => res.json(profile));
        } else {
          Profile.findOne({ handle: profileFields.handle }).then((handle) => {
            if (handle) {
              return res.status(400).json("That handle already exists");
            }
            //Create
            new Profile(profileFields).save().then((userprofile) => {
              res.json(userprofile);
            });
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
);

// Route 3: Get  api/profile/handle/:handle
// Getting user via handle
// Access public
router.get("/handle/:handle", async (req, res) => {
  //If there are errors then throw a bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    Profile.findOne({ handle: req.params.handle })
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          return res.status(400).json("There is no profile for this user");
        } else {
          res.json(profile);
        }
      });
  } catch (error) {
    console.log(error);
  }
});

// Route 4: Get  api/profile/user/:user_id
// Getting user via  user id
// Access public
router.get("/user/:user_id", async (req, res) => {
  //If there are errors then throw a bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    Profile.findOne({ user: req.params.user_id })
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          return res.status(400).json("There is no profile for this user");
        } else {
          res.json(profile);
        }
      })
      .catch((error) =>
        res.status(404).json({ profile: "There is no profile for this user" })
      );
  } catch (error) {
    return res.status(404).json({ error: errors.array() });
  }
});

// Route 5: Get  api/profile/all
// Getting all profiles
// Access public
router.get("/all", async (req, res) => {
  //If there are errors then throw a bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    Profile.find()
      .populate("user", ["name", "avatar"])
      .then((profiles) => {
        if (!profiles) {
          return res.status(400).json("There are no profiles");
        } else {
          res.json(profiles);
        }
      })
      .catch((error) =>
        res.status(404).json({ profile: "There are no profiles" })
      );
  } catch (error) {
    return res.status(404).json({ error: errors.array() });
  }
});

// Route 6: Post  api/experience
// To add experience to the profile
// Access private

router.post(
  "/experience",
  authenticate,
  [
    body("title", "Title is required").exists(),
    body("company", "Company is required").exists(),
    body("from", "From Date is required").exists(),
  ],
  async (req, res) => {
    //If there are errors then throw a bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      Profile.findOne({ user: req.user.id }).then((profile) => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description,
        };
        profile.experience.unshift(newExp);
        profile.save().then(res.json(profile));
      });
    } catch (error) {
      return res.status(404).json({ error: errors.array() });
    }
  }
);
// Route 6: Post  api/education
// To add education to the profile
// Access private

router.post(
  "/education",
  authenticate,
  [
    body("school", "School is required").exists(),
    body("degree", "Degree is required").exists(),
    body("fieldofstudy", "Feild of study is required").exists(),
  ],
  async (req, res) => {
    //If there are errors then throw a bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      Profile.findOne({ user: req.user.id }).then((profile) => {
        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description,
        };
        profile.education.unshift(newEdu);
        profile.save().then(res.json(profile));
      });
    } catch (error) {
      return res.status(404).json({ error: errors.array() });
    }
  }
);

// Route 7: Delete  api/experience/:exp_id
// To delete education to the profile
// Access private

router.delete("/experience/:exp_id", authenticate, async (req, res) => {
  try {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const removeIndex = profile.experience.findIndex(
        (item) => item.id === req.params.exp_id
      );

      profile.experience.splice(removeIndex, 1);
      profile.save().then((profile) => {
        res.json(profile);
      });
    });
  } catch (error) {
    return res.status(404).json({ error: errors.array() });
  }
});

// Route 8: Delete  api/education/:edu_id
// Delete education to the profile
// Access private

router.delete("/education/:edu_id", authenticate, async (req, res) => {
  try {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const removeIndex = profile.education
        .map((item) => item.id)
        .indexOf(req.params.edu_id);

      profile.education.splice(removeIndex, 1);
      profile.save().then((profile) => {
        res.json(profile);
      });
    });
  } catch (error) {
    return res.status(404).json({ error: errors.array() });
  }
});
// Route 9: Delete   api/
// Delete User and Profile
// Access private

router.delete("/", authenticate, async (req, res) => {
  try {
    Profile.findOneAndRemove({ user: req.user.id }).then(
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      )
    );
  } catch (error) {
    return res.status(404).json({ error: errors.array() });
  }
});

module.exports = router;
