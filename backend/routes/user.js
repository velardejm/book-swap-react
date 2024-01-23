const express = require("express");
const { loadData } = require("../utils/helpers");
const authenticateToken = require("../middleware/authenticateToken");

const usersRouter = express.Router();

const { usersData, usersTransactionData } = loadData();

usersRouter.get("/dashboard", authenticateToken, (req, res) => {

  const userData = usersData.find((data) => data.userId === req.user.userId);
  const { username, userId, ...transactions } = usersTransactionData.find(
    (data) => data.userId === req.user.userId
  );

  const data = { ...userData, ...transactions };
  res.status(200).json({ data: data });
});

usersRouter.get("/authenticate", authenticateToken, (req, res) => {
  // const { usersData } = loadData();
  const user = usersData.find((user) => user.userId === req.user.userId);
  if (user) {
    res.status(200).json({ data: user });
  }
});

module.exports = usersRouter;
