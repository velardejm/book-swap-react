const express = require("express");
const { loadData } = require("../utils/helpers");
const authenticateToken = require("../middleware/authenticateToken");

const swapRouter = express.Router();

swapRouter.get("/:owner/:bookId", authenticateToken, (req, res) => {
  const { usersData } = loadData();
  const user = usersData.find((user) => user.username === req.params.owner);
  const book = user.booksAvailable.find(
    (book) => book.bookId === req.params.bookId
  );
  res.status(200).json({ data: book });
});

swapRouter.post("/:owner/:bookId/:user", authenticateToken, (req, res) => {
  const { usersTransactionData } = loadData();
  const bookOwnerIndex = usersTransactionData.findIndex(
    (owner) => owner.username === req.params.owner
  );

  if (!bookOwnerIndex) {
    return;
  }
  const { inTransaction, ...bookDetails } = req.body;
  const swapRequest = { requestor: req.params.user, ...bookDetails };

  const bookOwner = usersTransactionData[bookOwnerIndex];
  const ownerReceivedRequests = bookOwner.incomingSwapRequests;

  const isRequestExists = ownerReceivedRequests.find(
    (request) => request.bookId === swapRequest.bookId
  );

  if (isRequestExists) {
    return;
  }

  ownerReceivedRequests.push(swapRequest);
  console.log(ownerReceivedRequests);
});

module.exports = swapRouter;
