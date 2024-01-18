const express = require("express");
const { loadData } = require("../utils/helpers");
const authenticateToken = require("../middleware/authenticateToken");

const booksRouter = express.Router();

booksRouter.get("/listings", (req, res) => {
  const { usersData } = loadData();
  const bookListings = usersData.map((user) => {
    return {
      user: user.username,
      listings: user.booksAvailable,
    };
  });

  res.status(200).json({
    data: bookListings,
  });
});

booksRouter.post("/", authenticateToken, (req, res) => {
  const { usersData } = loadData();
  const userData = usersData.find(
    (user) => user.username === req.user.username
  );
  if (userData) {
    userData.booksAvailable.push(req.body);
    res.status(200).json({
      message: "New book added successfully.",
    });
  }
});

module.exports = booksRouter;
