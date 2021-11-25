const bcrypt = require("bcrypt");
const crypto = require("crypto");
const express = require("express");

const User = require("../../models/User");

const router = express.Router();

const handleLoginFunc = (role) => async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password))
    return res
      .status(400)
      .json({ message: "Please provide email and password" });

  const user = await User.findOne({ email, role });

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.json({ token: user.token });
  }
  res.status(400).json({ message: "Invalid credentials." });
};

router.post("/login/student", handleLoginFunc("student"));

router.post("/login/teacher", handleLoginFunc("teacher"));

router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  if (!(email && password && role)) {
    return res.status(400).json({
      message: "Please provide email, password and role.",
    });
  }

  const oldUser = await User.findOne({ email });

  if (oldUser) {
    return res.status(400).json({
      message: "User already exists.",
    });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const token = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    role,
    token,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });

  res.status(201).json(user);
});

module.exports = router;
