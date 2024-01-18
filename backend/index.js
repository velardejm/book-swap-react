const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loadData } = require("./utils/helper");
const authenticationRoutes = require("./routes/authentication");

const app = express();
const port = 3001;

let users;
let usersData;
let usersTransactionData;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  data = loadData();
  users = data.users;
  usersData = data.usersData;
  usersTransactionData = data.usersTransactionData;
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).send("Token not provided.");
  }

  jwt.verify(token, "SECRET", (err, user) => {
    if (err) {
      return res.status(401).send("Invalid token or session expired.");
    } else {
      req.user = user;

      next();
    }
  });
}

app.use("/", authenticationRoutes);

// app.get("/", (req, res) => {});

app.get("/listings", (req, res) => {
  const bookListings = usersData.map((user) => {
    return {
      user: user.username,
      listings: user.booksAvailable,
    };
  });

  res.json({
    response: bookListings,
  });
});

app.get("/protected", authenticateToken, (req, res) => {
  const user = users.find((u) => u.username === req.user.username);
  if (user) {
    const { username, password, ...userData } = user;
    res.status(200).json({ data: userData });
  } else {
    res.json({ message: "User data not found." });
  }
});

app.get("/dashboard", authenticateToken, (req, res) => {
  const user = users.find((u) => u.username === req.user.username);
  const { incomingSwapRequests } = usersTransactionData.find(
    (user) => user.username === req.user.username
  );

  if (user) {
    const { username } = user;

    const userDetail = usersData.find((u) => u.username === username);

    const data = { ...userDetail, incomingSwapRequests };

    res.status(200).json({ data: data });
  } else {
    res.json({ message: "User data not found." });
  }
});

app.get("/authenticate", authenticateToken, (req, res) => {
  const user = usersData.find((u) => u.username === req.user.username);
  if (user) {
    res.status(200).json({ data: user });
  }
});

app.post("/book", authenticateToken, (req, res) => {
  const userData = usersData.find(
    (user) => user.username === req.user.username
  );
  if (userData) {
    userData.booksAvailable.push(req.body);
    res.status(200).json({
      message: "New book added successfully.",
    });
  }
});

app.get("/swap/:owner/:bookId", authenticateToken, (req, res) => {
  const user = usersData.find((user) => user.username === req.params.owner);
  const book = user.booksAvailable.find(
    (book) => book.bookId === req.params.bookId
  );
  res.status(200).json({ data: book });
});

app.post("/swap/:owner/:bookId/:user", authenticateToken, (req, res) => {
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
