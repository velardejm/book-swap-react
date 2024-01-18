const express = require("express");
const { loadData } = require("../utils/helpers");
const authenticateToken = require("../middleware/authenticateToken");

const usersRouter = express.Router();

usersRouter.get("/dashboard", authenticateToken, (req, res) => {
  const { users, usersData, usersTransactionData } = loadData();
  const user = users.find((u) => u.username === req.user.username);
  const { incomingSwapRequests } = usersTransactionData.find(
    (user) => user.username === req.user.username
  );

  if (user) {
    const { username } = user;
    const userDetail = usersData.find((u) => u.username === username);
    const data = { ...userDetail, incomingSwapRequests };

    res.status(200).json({ data: data });
  } else {
    res.json({ message: "User data not found." });
  }
});

usersRouter.get("/authenticate", authenticateToken, (req, res) => {
  const { usersData } = loadData();
  const user = usersData.find((u) => u.username === req.user.username);
  if (user) {
    res.status(200).json({ data: user });
  }
});

module.exports = usersRouter;
