const express = require("express");
const { loadData } = require("../utils/helpers");
const authenticateToken = require("../middleware/authenticateToken");

const usersRouter = express.Router();

const { usersData, usersTransactionData } = loadData();

usersRouter.get("/authenticate", authenticateToken, (req, res) => {
  res.status(200).json({ data: req.user });
});

usersRouter.get("/dashboard", authenticateToken, (req, res) => {
  const userData = usersData.find((data) => data.userId === req.user.userId);
  const { username, userId, ...transactions } = usersTransactionData.find(
    (data) => data.userId === req.user.userId
  );

  const data = { ...userData, ...transactions };
  res.status(200).json({ data: data });
});

usersRouter.get("/transactions", authenticateToken, (req, res) => {
  const userTransactionData = usersTransactionData.find(
    (user) => user.userId === req.user.userId
  );
  if (userTransactionData) {
    res
      .status(200)
      .json({ data: { ...userTransactionData, userId: req.user.userId } });
  } else {
    res.status(401).json({ error: "Transaction data not found." });
  }
});

module.exports = usersRouter;
