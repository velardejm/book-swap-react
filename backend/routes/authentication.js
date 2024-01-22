const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authenticateToken = require("../middleware/authenticateToken");
const { loadData, saveData } = require("../utils/helpers");
const { v4: uuidv4 } = require("uuid");

const authenticationRouter = express.Router();
const data = loadData();

authenticationRouter.post("/signup", async (req, res) => {
  const { name, email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuidv4();

  const newUser = {
    username: username,
    password: hashedPassword,
    userId: userId,
  };

  const newUserData = {
    name: name,
    email: email,
    userId: userId,
    booksAvailable: [],
  };

  const newUserTransactionData = {
    username: username,
    userId: userId,
    incomingRequests: [],
    sentRequests: [],
    transactionsToConfirm: [],
    closedTransactions: [],
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
  const user = users.find((user) => user.username === username);
  if (!user) {
    res.status(401).json({ message: "User not found." });
  } else {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { username: user.username, userId: user.userId },
        "SECRET",
        {
          expiresIn: 3600,
        }
      );
      res.status(200).json({ user: user.userId, token: token });
    } else {
      res.status(401).json({ message: "Incorrect password." });
    }
  }
});

module.exports = authenticationRouter;
