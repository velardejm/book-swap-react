const express = require("express");
const { loadData, saveData } = require("../utils/helpers");
const authenticateToken = require("../middleware/authenticateToken");

const booksRouter = express.Router();

booksRouter.get("/listings", (req, res) => {
  const { usersData } = loadData();
  const bookListings = usersData.map((user) => {
    return {
      owner: user.username,
      books: user.booksAvailable,
    };
  });

  res.status(200).json({
    data: bookListings,
  });
});

// ADD NEW BOOK
booksRouter.post("/", authenticateToken, (req, res) => {
  const data = loadData();
  const userData = data.usersData.find(
    (user) => user.username === req.user.username
  );
  if (userData) {
    userData.booksAvailable.push(req.body);
    saveData(data);
    res.status(200).json({
      message: "New book added successfully.",
    });
  }
});

module.exports = booksRouter;
