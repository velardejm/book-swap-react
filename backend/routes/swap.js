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

  const request = {
    requestId: Math.floor(Math.random() * 1000000000).toString(),
    requestedBookId: requestedBookId,
    requestorId: requestorId,
    bookToSwapId: bookToSwapId,
  };

  const requestCheckString = requestedBookId + requestorId;

  const requestIndex = incomingRequests.findIndex((request) => {
    const { requestedBookId, requestorId } = request;
    return requestedBookId + requestorId === requestCheckString;
  });

  console.log(requestIndex);

  if (requestIndex === -1) {
    incomingRequests.push({
      ...request,
      requestor,
      bookToSwap,
      requestedBook,
      status: "reviewByOwner",
    });
    saveData(data);
    res.status(200).json({ message: "Request sent successfully." });
  } else {
    res.status(404).json({ message: "Request already exists." });
  }
});

module.exports = swapRouter;
