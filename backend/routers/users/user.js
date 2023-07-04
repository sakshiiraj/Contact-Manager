const mongoose = require("mongoose");
const express = require("express");
const User = require("../../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = new express.Router();

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "No User!!!",
      });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, jwtObj) => {
      if (err) {
        return res.status(403).json({
          status: "failed",
          message: "Invalid User!!!",
        });
      }
      req.user = jwtObj._doc;
      next();
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
  }
};

// sign up route
router.post("/user/signup", async (req, res) => {
  try {
    const regUser = await User.find({ email: req.body.email });
    if (regUser.length != 0) {
      return res.status(404).json({
        status: "failed",
        message: "User Already Registered!!!",
      });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const saveData = new User({
      ...req.body,
      password: hashPassword,
    });

    res.json({
      status: "success",
      data: await saveData.save(),
    });
  } catch (e) {
    res.status(403).json({
      status: "failed",
      message: e.message,
    });
  }
});

// sign in route
router.post("/user/signin", async (req, res) => {
  try {
    const logUser = await User.find({ email: req.body.email });

    if (logUser.length == 0) {
      return res.status(404).json({
        status: "failed",
        message: "User Not Registered!!!",
      });
    }
    const isValid = await bcrypt.compare(
      req.body.password,
      logUser[0].password
    );

    if (!isValid) {
      return res.status(401).json({
        status: "failed",
        message: "Wrong Password!!!",
      });
    }

    const token = jwt.sign({ ...logUser[0] }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "success",
      user: {
        email: logUser[0].email,
        token,
      },
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
  }
});

router.get("/user/signin", authenticateToken, (req, res) => {
  res.json({
    status: "success",
  });
});
module.exports = router;