const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authenticateToken = require("../middleware/authenticateToken");
const { loadData, saveData } = require("../utils/helper");

const authenticationRouter = express.Router();
const data = loadData();

authenticationRouter.post("/signup", async (req, res) => {
  const { name, email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    username: username,
    password: hashedPassword,
  };

  const newUserData = {
    name: name,
    email: email,
    username: username,
    booksAvailable: [],
  };

  const newUserTransactionData = {
    username: username,
    incomingSwapRequests: [],
  };

  const foundExistingUser = !!data.users.find(
    (user) => user.username === username
  );
  const foundExistingEmail = !!data.usersData.find(
    (user) => user.email === email
  );

  if (foundExistingUser || foundExistingEmail) {
    return res
      .status(409)
      .json({ message: "username or e-mail already exists" });
  }

  data.users.push(newUser);
  data.usersData.push(newUserData);
  data.usersTransactionData.push(newUserTransactionData);
  saveData(data);
  res.json({
    message: "Registration successful!",
  });
});

authenticationRouter.post("/login", async (req, res) => {
  const { users } = loadData();
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) {
    res.status(401).json({ message: "User not found." });
  } else {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username: user.username }, "SECRET", {
        expiresIn: 3600,
      });
      res.status(200).json({ user: user.username, token: token });
      console.log("success!");
    } else {
      res.status(401).json({ message: "Incorrect password." });
    }
  }
});

module.exports = authenticationRouter;
