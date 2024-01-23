const express = require("express");
const { loadData, saveData } = require("../utils/helpers");
const authenticateToken = require("../middleware/authenticateToken");

const swapRouter = express.Router();

const data = loadData();
const { usersData, usersTransactionData } = data;

swapRouter.get("/:owner/:bookId", authenticateToken, (req, res) => {
  const bookOwner = usersData.find((user) => user.userId === req.params.userId);
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
  const { requestor, requestedBook, bookToSwap, bookOwner } = req.body;
  bookToSwap.inTransaction = true;

  const userTransactionIndex = usersTransactionData.findIndex(
    (data) => data.username === bookOwner
  );
  const swapRequests =
    usersTransactionData[userTransactionIndex].incomingRequests;

  let isTransactionFound = false;

  for (let i = 0; i < swapRequests.length; i++) {
    const {
      requestor: requestorCheck,
      requestedBook: requestedBookCheck,
      bookOwner: bookOwnerCheck,
      bookToSwap: bookToSwapCheck,
    } = swapRequests[i];

    if (
      requestor === requestorCheck &&
      requestedBook.bookId === requestedBookCheck.bookId &&
      bookToSwap.bookId === bookToSwapCheck.bookId &&
      bookOwner === bookOwnerCheck
    ) {
      isTransactionFound = true;
      break;
    }
  }

  if (!isTransactionFound) {
    swapRequests.push(req.body);
    // saveData(data);
  }

  // check if the book is requested and offerred with the same book from the same user

  // const bookOwnerIndex = usersTransactionData.findIndex(
  //   (owner) => owner.username === req.params.owner
  // );

  // if (!bookOwnerIndex) {
  //   return;
  // }
  // const { inTransaction, ...bookDetails } = req.body;
  // const swapRequest = { requestor: req.params.user, ...bookDetails };

  // const bookOwner = usersTransactionData[bookOwnerIndex];
  // const ownerReceivedRequests = bookOwner.incomingRequests;

  // const isRequestExists = ownerReceivedRequests.find(
  //   (request) => request.bookId === swapRequest.bookId
  // );

  // if (isRequestExists) {
  //   return;
  // }

  // ownerReceivedRequests.push(swapRequest);
  // saveData(data);
  // console.log(ownerReceivedRequests);
});

module.exports = swapRouter;
