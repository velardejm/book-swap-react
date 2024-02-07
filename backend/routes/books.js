const express = require("express");
const { loadData, saveData } = require("../utils/helpers");
const authenticateToken = require("../middleware/authenticateToken");
const { pool } = require("../db");

const booksRouter = express.Router();

const data = loadData();
const { usersData, usersTransactionData } = data;

booksRouter.get("/", authenticateToken, async (req, res) => {
  const sqlGetBookIds = "SELECT (book_id) FROM ownedbooks WHERE user_id=$1";
  const sqlGetBooks = "SELECT * FROM books WHERE id = ANY($1)";

  const bookIds = await pool.query(sqlGetBookIds, [req.user.userId]);

  const bookIdsArray = bookIds.rows.map((bookId) => bookId.book_id);

  console.log(bookIdsArray);

  const books = await pool.query(sqlGetBooks, [bookIdsArray]);
  console.log(books.rows);

  // const userData = usersData.find((user) => user.userId === req.user.userId);
  // const { booksAvailable } = userData;
  res.status(200).json({ data: books.rows });
});

booksRouter.get("/listings", (req, res) => {
  // const bookListings = usersData.map((user) => {
  //   return {
  //     owner: user.username,
  //     books: user.booksAvailable,
  //   };
  // });

  res.status(200).json({
    data: usersData,
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

    pool.query(sqlAssignBook, [req.user.userId, result.rows[0].id]);

    pool.query("COMMIT");
    res.status(200).json({ message: "Book added successfully." });
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
