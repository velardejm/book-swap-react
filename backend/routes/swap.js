const express = require("express");
const { loadData, saveData } = require("../utils/helpers");
const authenticateToken = require("../middleware/authenticateToken");

const swapRouter = express.Router();

const data = loadData();
const { usersData, usersTransactionData } = data;

swapRouter.get("/:owner/:bookId", authenticateToken, (req, res) => {
  console.log(req.params);
  // const bookOwner = usersData.find((user) => user.userId === req.params.owner);
  // const requestedBook = bookOwner.booksAvailable.find(
  //   (book) => book.bookId === req.params.bookId
  // );
  // const user = usersData.find((user) => user.userId === req.user.userId);
  // const userBooks = user.booksAvailable.filter(
  //   (book) => book.inTransaction === false
  // );
  // res.status(200).json({
  //   data: {
  //     requestedBookDetails: { owner: bookOwner.name, ...requestedBook },
  //     userBooks: userBooks,
  //   },
  // });
});

swapRouter.post("/:user/:bookId/:owner", authenticateToken, (req, res) => {
  console.log("test");
});

module.exports = swapRouter;
