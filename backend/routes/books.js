const express = require("express");
const { loadData, saveData } = require("../utils/helpers");
const authenticateToken = require("../middleware/authenticateToken");
const checkToken = require("../middleware/checkToken");
const { pool } = require("../db");

const {
  queryGetBooks,
  queryGetAllBooks,
  queryGetListing,
  queryGetBook
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
    res.status(200).json({ data: books });
  } catch (err) {
    console.log(err);

    res.status(400).json({ message: "Add book request failed." });

    pool.query("ROLLBACK");
  }
});



// UPDATE EXISTING BOOK
booksRouter.patch("/:bookId", authenticateToken, async (req, res) => {

  const { title, author, genre, condition } = req.body;
  const { owner_id } = await queryGetBook(req.params.bookId);

  if (owner_id === req.user.userId) {
    const sqlUpdateBook = "UPDATE books SET title = $1, author = $2, genre = $3, condition = $4 WHERE id = $5";
    try {
      await pool.query(sqlUpdateBook, [title, author, genre, condition, req.params.bookId]);
      const books = await queryGetBooks(req.user.userId);
      res.status(200).send({ data: books });
    } catch {
      res.status(404).send({ error: "Book update failed." });
    }
  } else {
    res.status(401).send({ error: "Unauthorized." });
  }

});


booksRouter.delete("/:bookId", authenticateToken, async (req, res) => {
  const { id, owner_id } = await queryGetBook(req.params.bookId);

  if (owner_id === req.user.userId) {
    const sqlDeleteBook = "DELETE from books WHERE id = $1";
    try {
      await pool.query(sqlDeleteBook, [id]);
      const books = await queryGetBooks(req.user.userId);
      res.status(200).send({ data: books });
    } catch {
      res.status(404).send({ error: "Book update failed." });
    }
  } else {
    res.status(401).send({ error: "Unauthorized." });
  }
});


module.exports = booksRouter;
