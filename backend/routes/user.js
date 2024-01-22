const express = require("express");
const { loadData } = require("../utils/helpers");
const authenticateToken = require("../middleware/authenticateToken");

const usersRouter = express.Router();

usersRouter.get("/dashboard", authenticateToken, (req, res) => {
  const { usersData, usersTransactionData } = loadData();

  const userData = usersData.find((data) => data.userId === req.user.userId);
  const { username, userId, ...transactions } = usersTransactionData.find(
    (data) => data.userId === req.user.userId
  );

  const data = { ...userData, ...transactions };
  console.log(data);
  res.status(200).json({ data: data });
});

usersRouter.get("/authenticate", authenticateToken, (req, res) => {
  const { usersData } = loadData();
  const user = usersData.find((u) => u.username === req.user.username);
  if (user) {
    res.status(200).json({ data: user });
  }
});

module.exports = usersRouter;
