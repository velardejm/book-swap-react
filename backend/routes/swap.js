const express = require("express");
const { loadData, saveData } = require("../utils/helpers");
const authenticateToken = require("../middleware/authenticateToken");

const swapRouter = express.Router();

const data = loadData();
const { usersData, usersTransactionData } = data;

swapRouter.get("/:owner/:bookId", authenticateToken, (req, res) => {
  const bookOwner = usersData.find((user) => user.userId === req.params.owner);
  const requestedBook = bookOwner.booksAvailable.find(
    (book) => book.bookId === req.params.bookId
  );
  const user = usersData.find((user) => user.userId === req.user.userId);
  const userBooks = user.booksAvailable.filter(
    (book) => book.inTransaction === false
  );
  res.status(200).json({
    data: {
      requestedBookDetails: { owner: bookOwner.name, ...requestedBook },
      userBooks: userBooks,
    },
  });
});

swapRouter.post("/:user/:bookId/:owner", authenticateToken, (req, res) => {
  const {
    requestedBookId,
    bookOwnerId,
    bookToSwapId,
    requestorId,
    requestor,
    bookToSwap,
    requestedBook,
  } = req.body;

  const { incomingRequests } = usersTransactionData.find(
    (user) => user.userId === bookOwnerId
  );

  const { sentRequests } = usersTransactionData.find(
    (user) => user.userId === requestorId
  );

  const request = {
    requestId: Math.floor(Math.random() * 1000000000).toString(),
    bookOwnerId: bookOwnerId,
    requestedBookId: requestedBookId,
    requestorId: requestorId,
    bookToSwapId: bookToSwapId,
  };

  const requestCheckString = requestedBookId + requestorId;

  const requestIndex = incomingRequests.findIndex((request) => {
    const { requestedBookId, requestorId } = request;
    return requestedBookId + requestorId === requestCheckString;
  });

  if (requestIndex === -1) {
    requestedBook.inTransaction = true;
    bookToSwap.inTransaction = true;

    const requestData = {
      ...request,
      requestor,
      bookToSwap,
      requestedBook,
      status: "reviewByOwner",
    };

    incomingRequests.push(requestData);
    sentRequests.push(requestData);

    saveData(data);
    res.status(200).json({ message: "Request sent successfully." });
  } else {
    res.status(404).json({ message: "Request already exists." });
  }
});

swapRouter.post("/respond/:transactionId", authenticateToken, (req, res) => {
  // steps
  // 1. Find index
  // 2. If accepted, swap books
  // 3. If rejected, move transaction to closed.

  const transactionData = usersTransactionData.find(
    (data) => data.userId === req.user.userId
  );
  const { incomingRequests, transactionsToConfirm } = transactionData;
  const requestIndex = incomingRequests.findIndex(
    (request) => request.requestId === req.body.requestId
  );
  const respondedRequest = incomingRequests.splice(requestIndex, 1);
  const { requestorId, bookToSwapId, bookOwnerId, requestedBookId } =
    respondedRequest[0];

  // SWAP BOOK
  const { booksAvailable } = usersData.find(
    (user) => user.userId === requestorId
  );
  const bookToSwapIndex = booksAvailable.findIndex(
    (book) => book.bookId === bookToSwapId
  );
  const requestorBook = booksAvailable.splice(bookToSwapIndex, 1);

  const { booksAvailable: ownerBooksAvailable } = usersData.find(
    (user) => user.userId === bookOwnerId
  );
  const requestedBookBookIndex = ownerBooksAvailable.findIndex(
    (book) => book.bookId === requestedBookId
  );
  const requestedBook = booksAvailable.splice(requestedBookBookIndex, 1);

  booksAvailable.push(requestedBook);
  ownerBooksAvailable.push(requestorBook);

  // MOVE TRANSACTION TO TRANSACTIONS TO CONFIRM

  transactionsToConfirm.push(respondedRequest[0]);
  const {
    sentRequests,
    transactionsToConfirm: requestorTransactionsToConfirm,
  } = usersTransactionData.find((user) => user.userId === requestorId);
  const sentRequestIndex = sentRequests.findIndex(
    (request) => request.requestId === req.body.requestId
  );
  const sentRequest = sentRequests.splice(sentRequestIndex, 1);
  requestorTransactionsToConfirm.push(sentRequest);

  saveData(data);
  res.status(200).json({ data: incomingRequests });
});

module.exports = swapRouter;
