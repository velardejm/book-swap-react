const express = require("express");
const { loadData, saveData } = require("../utils/helpers");
const authenticateToken = require("../middleware/authenticateToken");
const { pool } = require("../db");
const {
  queryGetBooks,
  queryGetAvailableBooks,
  queryGetSwapRequest,
  querySwapBook,
  queryGetBook,
} = require("../utils/helper-queries");

const swapRouter = express.Router();

const data = loadData();
const { usersData, usersTransactionData } = data;

swapRouter.get("/:owner/:bookId", authenticateToken, async (req, res) => {
  // NOTE: owner params not used here, consider changing the url (remove owner params)

  try {
    const sqlGetBook = "SELECT * FROM books WHERE id=$1";
    const sqlGetBookOwnerId =
      "SELECT (user_id) FROM ownedbooks WHERE book_id = $1";
    const sqlGetBookOwnerDetails = "SELECT (name) FROM usersinfo WHERE id=$1";

    const book = await pool.query(sqlGetBook, [req.params.bookId]);
    const bookOwnerId = await pool.query(sqlGetBookOwnerId, [book.rows[0].id]);
    const ownerDetails = await pool.query(sqlGetBookOwnerDetails, [
      bookOwnerId.rows[0].user_id,
    ]);

    const userBooks = await queryGetAvailableBooks(req.user.userId);

    const data = {
      requestedBook: book.rows[0],
      bookOwner: ownerDetails.rows[0].name,
      userBooks: userBooks,
    };

    res.status(200).json({ data: data });
  } catch { }
});

swapRouter.post(
  "/:user/:bookId/:owner",
  authenticateToken,
  async (req, res) => {
    try {
      const {
        // requestedBookId,
        // bookOwnerId,
        // bookToSwapId,
        requesterId,
        // requester,
        // bookToSwap,
        // requestedBook,
        requestedBookId,
        offerredBookId,
      } = req.body;

      const sqlCheckExistingRequest =
        "SELECT * FROM swaprequests WHERE requester_id = $1 AND requested_book_id=$2 AND status = $3 ";

      const existingCheckResult = await pool.query(sqlCheckExistingRequest, [
        requesterId,
        requestedBookId,
        "pending",
      ]);

      if (existingCheckResult.rowCount > 0) {
        res.status(409).json({ message: "Request already exist" });
        return;
      }

      const sqlCheckEquivalentRequest =
        "SELECT * FROM swaprequests WHERE requestee_id = $1 AND requested_book_id = $2 AND offerred_book_id = $3 AND status = $4";

      const equivalentCheckResult = await pool.query(
        sqlCheckEquivalentRequest,
        [req.user.userId, offerredBookId, requestedBookId, "pending"]
      );

      if (equivalentCheckResult.rowCount > 0) {
        res.status(409).json({
          message:
            "An equilvaent reuest already exists. Please check your incoming Swap requests.",
        });
        return;
      }

      const sqlGetBookOwnerId =
        "SELECT user_id FROM ownedbooks WHERE book_id=$1";
      const sqlSaveSwapRequest =
        "INSERT INTO swaprequests (requester_id, requestee_id, requested_book_id, offerred_book_id) VALUES ($1, $2, $3, $4)";
      const sqlUpdateBookSwapAvailability = "UPDATE books SET status = $1 WHERE id  = $2";

      await pool.query("BEGIN");

      const bookOwnerIdResult = await pool.query(sqlGetBookOwnerId, [
        requestedBookId,
      ]);

      const result = await pool.query(sqlSaveSwapRequest, [
        req.user.userId,
        bookOwnerIdResult.rows[0].user_id,
        requestedBookId,
        offerredBookId,
      ]);
      
      await pool.query(sqlUpdateBookSwapAvailability, ['pending_swap', offerredBookId]);

      await pool.query("COMMIT");

      if (result.rowCount > 0) {
        res.status(200).json({ message: "Swap request sent successfully." });
      }
    } catch (err) {
      console.log(err);
      pool.query("ROLLBACK");
      res.status(400).json({ message: "Swap request failed." });
    }
  }
);

swapRouter.post(
  "/respond/:transactionId",
  authenticateToken,
  async (req, res) => {
    let receivedBook = null;
    let requestedBookId = null;
    try {
      const { response, requestId } = req.body;
      pool.query("BEGIN");

      if (response === "reject") {
        const sqlRejectRequest =
          "UPDATE swaprequests SET status = $1 WHERE id = $2";
        await pool.query(sqlRejectRequest, ["rejected", requestId]);
      }

      if (response === "accept") {
        const request = await queryGetSwapRequest(requestId);
        const {
          id,
          requester_id,
          requestee_id,
          requested_book_id,
          offerred_book_id,
        } = request;

        await querySwapBook(
          id,
          requester_id,
          requestee_id,
          requested_book_id,
          offerred_book_id
        );

        receivedBook = await queryGetBook(offerred_book_id);
        requestedBookId = requested_book_id;
      }
      pool.query("COMMIT");

      const data = {
        receivedBook: receivedBook,
        requestedBookId: requestedBookId,
      };

      res.status(200).json({ ...data });
    } catch {
      pool.query("ROLLBACK");
    }
  }
);

module.exports = swapRouter;
