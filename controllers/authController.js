const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashpassword = await bycrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashpassword,
    });

    await user.save();

    res.status(201).send({ message: "User register succesfully" });
  } catch (error) {
    res.status(500).send({ message: "Error registering  new user" });
  }
};

exports.login = async (req, res) => {};

exports.protected = async (req, res) => {};
