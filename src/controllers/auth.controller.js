const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user.model");

const generateToken = (user)=>{

    return jwt.sign({user}, process.env.KEY);
};

const register = async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).send("already registered");
      }
      user = await User.create(req.body);
      const token = generateToken(user);
      return res.status(400).send({ user: user, token: token });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };
  
  const login = async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).send("email does not match");
      }
      const match = user.checkPassword(req.body.password);
      if (!match) {
        return res.status(400).send("password does not match");
      }
      const token = generateToken(user);
      return res.status(400).send({ user: user, token: token });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };
  
  module.exports = { register, login };