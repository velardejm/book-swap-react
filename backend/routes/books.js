const express = require("express");
const { loadData, saveData } = require("../utils/helpers");
const authenticateToken = require("../middleware/authenticateToken");

const booksRouter = express.Router();

const data = loadData();
const { usersData, usersTransactionData } = data;

booksRouter.get("/", authenticateToken, (req, res) => {
  const userData = usersData.find((user) => user.userId === req.user.userId);
  const { booksAvailable } = userData;
  res.status(200).json({ data: booksAvailable });
});

booksRouter.get("/listings", (req, res) => {
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
  const userData = usersData.find((user) => user.userId === req.user.userId);
  if (userData) {
    userData.booksAvailable.push(req.body);
    saveData(data);

    const { booksAvailable } = userData;
    res.status(200).json({
      updatedBookList: booksAvailable,
    });
  }
});

module.exports = booksRouter;
