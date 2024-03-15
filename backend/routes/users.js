const express = require("express");
const { loadData } = require("../utils/helpers");
const authenticateToken = require("../middleware/authenticateToken");
const { pool } = require("../db");

const { queryGetBook, queryGetUserName } = require("../utils/helper-queries");

const usersRouter = express.Router();

const { usersData, usersTransactionData } = loadData();

usersRouter.get("/authenticate", authenticateToken, async (req, res) => {
  const userName = await queryGetUserName(req.user.userId);
  res.status(200).json({ data: { name: userName, ...req.user } });
});

usersRouter.get("/dashboard", authenticateToken, (req, res) => {
  const userData = usersData.find((data) => data.userId === req.user.userId);
  const { username, userId, ...transactions } = usersTransactionData.find(
    (data) => data.userId === req.user.userId
  );

  const data = { ...userData, ...transactions };
  res.status(200).json({ data: data });
});

usersRouter.get("/transactions", authenticateToken, async (req, res) => {
  sqlGetSwapRequests =
    "SELECT * FROM swaprequests WHERE requestee_id = $1 AND status = $2";

  const swapRequestResults = await pool.query(sqlGetSwapRequests, [
    req.user.userId,
    "pending",
  ]);

  if (swapRequestResults.rowCount > 0) {
    const swapRequests = [];

    await Promise.all(
      swapRequestResults.rows.map(async (row) => {
        const { requester_id, requested_book_id, offerred_book_id } = row;
        const requestedBook = await queryGetBook(requested_book_id);
        const offerredBook = await queryGetBook(offerred_book_id);
        const requesterName = await queryGetUserName(requester_id);
        const requestData = {
          requestId: row.id,
          requesterName: requesterName,
          requestedBook,
          offerredBook,
        };
        swapRequests.push(requestData);
      })
    );

    res.status(200).json({ data: { swapRequests: swapRequests } });
  }
});

module.exports = usersRouter;
