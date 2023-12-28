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

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bycrypt.compare(password, user.password))) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    const userId = user._id;

    res.status(200).json({ token, userId });
  } catch (error) {
    res.status(500).send({ message: "error loggin in" });
  }
};

exports.protected = async (req, res) => {
  res.send({ message: "This is a protected route" });
};
