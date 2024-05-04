const { pool } = require("../db");

exports.queryGetAllBooks = async function () {
  const sqlGetAllBooks = "SELECT * FROM books";
  const books = await pool.query(sqlGetAllBooks);
  return books;
};

exports.queryGetBooks = async function (id) {
  const sqlGetBookIds = "SELECT (id) FROM books WHERE owner_id = $1";

  const bookIds = await pool.query(sqlGetBookIds, [id]);
  const bookIdsArray = bookIds.rows.map((i) => i.id);

  const sqlGetBooks = "SELECT * FROM books WHERE id = ANY($1)";
  const bookResults = await pool.query(sqlGetBooks, [bookIdsArray]);
  return bookResults.rows;
};

exports.queryGetAvailableBooks = async function (id) {
  const sqlGetBookIds = "SELECT (id) FROM books WHERE owner_id = $1";

  const bookIds = await pool.query(sqlGetBookIds, [id]);
  const bookIdsArray = bookIds.rows.map((i) => i.id);

  const sqlGetBooks = "SELECT * FROM books WHERE id = ANY($1) AND status != $2";
  // const bookResults = await pool.query(sqlGetBooks, [bookIdsArray, 'pending_swap']);
  const bookResults = await pool.query(sqlGetBooks, [bookIdsArray, '']);
  return bookResults.rows;
};


exports.queryGetListing = async function (id) {
  const sqlGetBookIds = "SELECT (id) FROM books WHERE owner_id != $1";
  const bookIds = await pool.query(sqlGetBookIds, [id]);
  const bookIdsArray = bookIds.rows.map((i) => i.id);
  const sqlGetBooks = "SELECT * FROM books WHERE id = ANY($1)AND status != $2";
  // const books = await pool.query(sqlGetBooks, [bookIdsArray, 'pending_swap']);
  const books = await pool.query(sqlGetBooks, [bookIdsArray, '']);

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

exports.queryGetSwapRequest = async function (id) {
  const sqlGetData = `SELECT * FROM swaprequests WHERE id=$1`;
  const result = await pool.query(sqlGetData, [id]);
  return result.rows[0];
};

exports.querySwapBook = async function (
  requesterId,
  requesteeId,
  requestedBookId,
  offerredBookId
) {

  try {
    const sqlUpdateBookOwner = "UPDATE books SET owner_id = $1 WHERE id = $2";
    await pool.query(sqlUpdateBookOwner, [requesterId, requestedBookId]);
    await pool.query(sqlUpdateBookOwner, [requesteeId, offerredBookId]);
    await pool.query("COMMIT");
  } catch (err) {
    console.log(err);
    pool.query("ROLLBACK");
  }
};

// OLD BOOK SWAP QUERY
// exports.querySwapBook = async function (
//   requestId,
//   requesterId,
//   requesteeId,
//   requestedBookId,
//   offerredBookId
// ) {
//   try {
//     const sqlUpdateSwapRequest =
//       "UPDATE swaprequests SET status=$1 WHERE id=$2";
//     const sqlUpdateRequestedBookOwner =
//       "UPDATE ownedbooks SET user_id = $1 WHERE user_id = $2 AND book_id = $3";
//     const sqlUpdateOfferredBookOwner =
//       "UPDATE ownedbooks SET user_id = $1 WHERE user_id = $2 AND book_id = $3";
//     pool.query("BEGIN");
//     await pool.query(sqlUpdateSwapRequest, ["accepted", requestId]);
//     await pool.query(sqlUpdateRequestedBookOwner, [
//       requesterId,
//       requesteeId,
//       requestedBookId,
//     ]);
//     await pool.query(sqlUpdateOfferredBookOwner, [
//       requesteeId,
//       requesterId,
//       offerredBookId,
//     ]);
//     await pool.query("COMMIT");
//   } catch (err) {
//     console.log(err);
//     pool.query("ROLLBACK");
//   }
// };

