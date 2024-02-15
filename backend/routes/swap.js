const express = require("express");
const { loadData, saveData } = require("../utils/helpers");
const authenticateToken = require("../middleware/authenticateToken");
const { pool } = require("../db");
const {
  queryGetBooks,
  queryGetSwapRequests,
  querySwapBook,
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

    const userBooks = await queryGetBooks(req.user.userId);

    const data = {
      requestedBook: book.rows[0],
      bookOwner: ownerDetails.rows[0].name,
      userBooks: userBooks,
    };

    res.status(200).json({ data: data });
  } catch {}

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

swapRouter.post(
  "/:user/:bookId/:owner",
  authenticateToken,
  async (req, res) => {
    try {
      const {
        // requestedBookId,
        // bookOwnerId,
        // bookToSwapId,
        // requestorId,
        // requestor,
        // bookToSwap,
        // requestedBook,
        requestedBookId,
        offerredBookId,
      } = req.body;

      const sqlGetBookOwnerId =
        "SELECT user_id FROM ownedbooks WHERE book_id=$1";
      const sqlSaveSwapRequest =
        "INSERT INTO swaprequests (requester_id, requestee_id, requested_book_id, offerred_book_id) VALUES ($1, $2, $3, $4) ON CONFLICT (requester_id, requested_book_id) DO NOTHING RETURNING *";

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

      await pool.query("COMMIT");

      if (result.rows.length > 0) {
        res.status(200).json({ message: "Swap request sent successfully." });
      } else {
        res.status(409).json({ message: "Request already exist" });
      }
    } catch {
      pool.query("ROLLBACK");
      res.status(400).json({ message: "Swap request failed." });
    }

    // const { incomingRequests } = usersTransactionData.find(
    //   (user) => user.userId === bookOwnerId
    // );

    // const { sentRequests } = usersTransactionData.find(
    //   (user) => user.userId === requestorId
    // );

    // const request = {
    //   requestId: Math.floor(Math.random() * 1000000000).toString(),
    //   bookOwnerId: bookOwnerId,
    //   requestedBookId: requestedBookId,
    //   requestorId: requestorId,
    //   bookToSwapId: bookToSwapId,
    // };

    // const requestCheckString = requestedBookId + requestorId;

    // const requestIndex = incomingRequests.findIndex((request) => {
    //   const { requestedBookId, requestorId } = request;
    //   return requestedBookId + requestorId === requestCheckString;
    // });

    // if (requestIndex === -1) {
    //   requestedBook.inTransaction = true;
    //   bookToSwap.inTransaction = true;

    //   const requestData = {
    //     ...request,
    //     requestor,
    //     bookToSwap,
    //     requestedBook,
    //     status: "reviewByOwner",
    //   };

    //   incomingRequests.push(requestData);
    //   sentRequests.push(requestData);

    //   saveData(data);
    //   res.status(200).json({ message: "Request sent successfully." });
    // } else {
    //   res.status(404).json({ message: "Request already exists." });
    // }
  }
);

// swapRouter.post("/respond/:transactionId", authenticateToken, (req, res) => {
//   // steps
//   // 1. Find index
//   // 2. If accepted, swap books
//   // 3. If rejected, move transaction to closed.

//   const transactionData = usersTransactionData.find(
//     (data) => data.userId === req.user.userId
//   );
//   const { incomingRequests, transactionsToConfirm } = transactionData;
//   const requestIndex = incomingRequests.findIndex(
//     (request) => request.requestId === req.body.requestId
//   );
//   const respondedRequest = incomingRequests.splice(requestIndex, 1);
//   const { requestorId, bookToSwapId, bookOwnerId, requestedBookId } =
//     respondedRequest[0];

//   // SWAP BOOK
//   const { booksAvailable } = usersData.find(
//     (user) => user.userId === requestorId
//   );
//   const bookToSwapIndex = booksAvailable.findIndex(
//     (book) => book.bookId === bookToSwapId
//   );
//   const bookToSwap = booksAvailable.splice(bookToSwapIndex, 1);

//   const { booksAvailable: ownerBooksAvailable } = usersData.find(
//     (user) => user.userId === bookOwnerId
//   );
//   const requestedBookBookIndex = ownerBooksAvailable.findIndex(
//     (book) => book.bookId === requestedBookId
//   );
//   const requestedBook = ownerBooksAvailable.splice(requestedBookBookIndex, 1);

//   booksAvailable.push(requestedBook[0]);
//   ownerBooksAvailable.push(bookToSwap[0]);

//   //MOVE BOOKS TO TRANSACTIONS TO BE CONFIRMED

//   // MOVE TRANSACTION TO TRANSACTIONS TO CONFIRM

//   transactionsToConfirm.push(respondedRequest[0]);
//   const {
//     sentRequests,
//     transactionsToConfirm: requestorTransactionsToConfirm,
//   } = usersTransactionData.find((user) => user.userId === requestorId);
//   const sentRequestIndex = sentRequests.findIndex(
//     (request) => request.requestId === req.body.requestId
//   );
//   const sentRequest = sentRequests.splice(sentRequestIndex, 1);
//   requestorTransactionsToConfirm.push(sentRequest);

//   saveData(data);
//   res.status(200).json({ data: incomingRequests });
// });

swapRouter.post(
  "/respond/:transactionId",
  authenticateToken,
  async (req, res) => {
    try {
      const { response, requestId } = req.body;
      pool.query("BEGIN");

      if (response === "reject") {
        const sqlRejectRequest =
          "UPDATE swaprequests SET status = $1 WHERE id = $2";
        await pool.query(sqlRejectRequest, ["rejected", requestId]);
      }

      if (response === "accept") {
        const request = await queryGetSwapRequests(requestId);
        const { id, requester_id, requestee_id } = request;
        await querySwapBook(id, requester_id, requestee_id);
      }

      pool.query("COMMIT");
      res.status(200).json({ message: "ok" });
    } catch {
      pool.query("ROLLBACK");
    }
  }
);

module.exports = swapRouter;
