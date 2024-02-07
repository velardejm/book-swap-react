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

booksRouter.get("/", authenticateToken, async (req, res) => {
  const books = await queryGetBooks(req.user.userId);
  res.status(200).json({ data: books });
});

booksRouter.get("/listings", checkToken, async (req, res) => {
  // const bookListings = usersData.map((user) => {
  //   return {
  //     owner: user.username,
  //     books: user.booksAvailable,
  //   };
  // });

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
booksRouter.post("/", authenticateToken, async (req, res) => {
  try {
    pool.query("BEGIN");

    const { title, author, genre, condition } = req.body;

    const sqlAddBook =
      "INSERT INTO books (title, author, genre, condition) VALUES ($1, $2, $3, $4) RETURNING id";

    const sqlAssignBook =
      "INSERT INTO ownedbooks (user_id, book_id) VALUES ($1, $2)";

    const result = await pool.query(sqlAddBook, [
      title,
      author,
      genre,
      condition,
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

  // const userData = usersData.find((user) => user.userId === req.user.userId);
  // if (userData) {
  //   userData.booksAvailable.push(req.body);
  //   saveData(data);
  //   const { booksAvailable } = userData;
  //   res.status(200).json({
  //     updatedBookList: booksAvailable,
  //   });
  // }
});

module.exports = booksRouter;
