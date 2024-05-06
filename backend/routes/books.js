const express = require("express");
const { loadData, saveData } = require("../utils/helpers");
const authenticateToken = require("../middleware/authenticateToken");
const checkToken = require("../middleware/checkToken");
const { pool } = require("../db");

const {
  queryGetBooks,
  queryGetAllBooks,
  queryGetListing,
} = require("../utils/helper-queries");

const booksRouter = express.Router();

const data = loadData();
const { usersData, usersTransactionData } = data;

booksRouter.get("/mybooks", authenticateToken, async (req, res) => {
  const books = await queryGetBooks(req.user.userId);
  res.status(200).json({ data: books });
});

booksRouter.get("/listings", checkToken, async (req, res) => {
  let bookListing = [];

  if (req.user) {
    const books = await queryGetListing(req.user.userId);
    bookListing = books;
  } else {
    const result = await queryGetAllBooks();
    bookListing = result.rows;
  }

  res.status(200).json({
    data: bookListing,
  });
});

// ADD NEW BOOK
booksRouter.post("/new", authenticateToken, async (req, res) => {
  try {
    await pool.query("BEGIN");

    const { title, author, genre, condition } = req.body;

    const sqlAddBook =
      "INSERT INTO books (title, author, genre, condition, owner_id) VALUES ($1, $2, $3, $4, $5) RETURNING id";

    const sqlAssignBook =
      "INSERT INTO ownedbooks (user_id, book_id) VALUES ($1, $2)";

    const result = await pool.query(sqlAddBook, [
      title,
      author,
      genre,
      condition,
      req.user.userId
    ]);

    await pool.query(sqlAssignBook, [req.user.userId, result.rows[0].id]);

    const books = await queryGetBooks(req.user.userId);

    pool.query("COMMIT");
    console.log(books);
    res.status(200).json({ data: books });
  } catch (err) {
    console.log(err);

    res.status(400).json({ message: "Add book request failed." });

    pool.query("ROLLBACK");
  }
});



// UPDATE EXISTING BOOK
booksRouter.patch("/edit/:bookId", authenticateToken, (req, res) => {

  // 1. verify if book owner id matches with the user id.
  //If yes, update the details of the book saved in the database.
  

});


module.exports = booksRouter;
