const req = require("express/lib/request");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const verifiedToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verifiedToken(token, process.env.KEY, (err, decode) => {
      if (err) {
        return reject(err);
      }
      return resolve(decode);
    });
  });
};

const authenticate = async (req, res, next) => {
  if (!req.headers.authorizetion) {
    return res.status(400).send("token does not found");
  }
  if (!req.headers.authorizetion.startsWith("Bearer ")) {
    return res.status(400).send("token does not found");
  }
};

const token = req.headers.authorizetion.trim().split(" ")[1];

let decode;
try {
  decode = await verifiedToken(token);
} catch (error) {
  res.status(400).send("token does not found");
}

req.user = decode.user._id;
module.exports = authenticate;