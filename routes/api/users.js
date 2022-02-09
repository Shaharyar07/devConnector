const express = require("express");
const User = require("../../modal/User");
const router = express.Router();
const garavatar = require("gravatar");
const bcrypt = require("bcryptjs");
var CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const authenticate = require("../../middleware/authenticate");
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const key = "glitch";

// Route: Get  api/users/test
// Access public
// Test User route
router.get("/test", async (req, res) => res.json({ msg: "user works" }));

// Route: Post  api/users/register
// Access public
// Signup User route
router.post(
  "/register",
  [
    body("email", "Enter a valid Email Address").isEmail(),
    body("password", "Enter a valid Password, Min - 4 letters ").isLength({
      min: 4,
    }),
    body("name", "Name is too short, Enter a valid name!").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //If there are errors then throw a bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let success = false;
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          errors: "Sorry user with this email already exist!",
        });
      }
      const avatar = garavatar.url(req.body.email, {
        s: 200,
        r: "pg",
        d: "mm",
      });
      const userSecret = CryptoJS.AES.encrypt(
        req.body.password,
        key
      ).toString();
      newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        userSecret,
      });
      const passBcrypt = await bcrypt.genSalt(10);
      const passHash = await bcrypt.hash(newUser.password, passBcrypt);

      newUser.password = passHash;

      newUser.save();
      success = true;
      res.json({ success, newUser });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal error occured");
    }
  }
);

// Route: Post  api/users/login
// Access public
// Sign in User route
router.post(
  "/login",
  [
    body("email", "Enter a valid Email Address").isEmail(),
    body("password", "Password cannot be blank! ").exists(),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    //If there are errors then throw a bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let success = false;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, email: "User not found" });
      }

      let userPass = await bcrypt.compare(password, user.password);
      if (!userPass) {
        return res
          .status(400)
          .json({ success, password: "Incorrect password" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(payload, key);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error);
      res.status(500).send("Some internal error occured");
    }
  }
);

//Get user  user Details using Post '/api/auth/authenticate'
router.post("/authenticate", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    const { userSecret } = user;
    var bytes = CryptoJS.AES.decrypt(userSecret, key);
    const secret = bytes.toString(CryptoJS.enc.Utf8);

    res.json({ user, secret });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal error occured");
  }
});

module.exports = router;
