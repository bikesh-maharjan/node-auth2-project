const router = require("express").Router();

const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");

const Users = require("../users/users-model");

router.get("/register", (req, res) => {
  const user = req.body;
  const isValid = validateUser(user);

  if (isValid) {
    const hash = bcryptjs.hashSync(user.password, 8);
    user.password = hash;
    Users.add(user)
      .then((newUser) => {
        const token = makeJwt(newUser);
        res.status(201).json({ data: newUser, token });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res
      .status(400)
      .json({ message: "invalid info, please verify and try again" });
  }
});

router.post("/login", (req, res) => {
  const creds = req.body;
  const isValid = validateCredentials(creds);

  if (isValid) {
    Users.getBy({ username: creds.username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(creds.password, user.password)) {
          const token = makeJwt(user);
          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: "you cannot pass" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({ message: "invalid info" });
  }
});

function validateUser(user) {
  return user.username && user.password ? true : false;
}

function validateCredentials(creds) {
  return creds.username && creds.password ? true : false;
}

function makeJwt({ id, username, department }) {
  const payload = {
    username,
    department,
    subject: id,
  };
  const config = {
    jwtSecret: "Tero Tauko",
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, config.jwtSecret, options);
}

module.exports = router;
