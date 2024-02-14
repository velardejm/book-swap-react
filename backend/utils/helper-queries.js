const { pool } = require("../db");

exports.queryGetAllBooks = async function () {
  const sqlGetAllBooks = "SELECT * FROM books";
  const books = await pool.query(sqlGetAllBooks);
  return books;
};

exports.queryGetBooks = async function (id) {
  const sqlGetBookIds = "SELECT (book_id) FROM ownedbooks WHERE user_id = $1";

  const bookIds = await pool.query(sqlGetBookIds, [id]);
  const bookIdsArray = bookIds.rows.map((i) => i.book_id);

  const sqlGetBooks = "SELECT * FROM books WHERE id = ANY($1)";
  const bookResults = await pool.query(sqlGetBooks, [bookIdsArray]);
  return bookResults.rows;
};

exports.queryGetListing = async function (id) {
  const sqlGetBookIds = "SELECT (book_id) FROM ownedbooks WHERE user_id != $1";
  const bookIds = await pool.query(sqlGetBookIds, [id]);
  const bookIdsArray = bookIds.rows.map((i) => i.book_id);

  const sqlGetBooks = "SELECT * FROM books WHERE id = ANY($1)";
  const books = await pool.query(sqlGetBooks, [bookIdsArray]);

  return books.rows;
};

exports.queryGetBook = async function (id) {
  const sqlGetBook = "SELECT * FROM books WHERE id=$1";
  const result = await pool.query(sqlGetBook, [id]);
  return result.rows[0];
};

exports.queryGetUserName = async function (id) {
  const sqlGetUserName = "SELECT name FROM usersinfo WHERE id=$1";
  const result = await pool.query(sqlGetUserName, [id]);
  return result.rows[0].name;
};
