const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loadData } = require("./utils/helper");

const app = express();
const port = 3001;

let users = [
  {
    name: "User 1",
    username: "booklover1",
    email: "booklover1@example.com",
    password: "$2b$10$/35QC92KG2EO3TsOIgOqaOYZh3gce9SyHOIK9SM79YG8VfrrH7ykq",
  },
  {
    name: "User 2",
    username: "readingfanatic",
    email: "readingfanatic@example.com",
    password: "$2b$10$/35QC92KG2EO3TsOIgOqaOYZh3gce9SyHOIK9SM79YG8VfrrH7ykq",
  },
];

let usersData = [];

let newUsers = [];

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  usersData = loadData();
});

app.get("/", (req, res) => {
  console.log("test");
});

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
  if (user) {
    const { username, password, ...userData } = user;
    const books = usersData.find((u) => u.username === username);
    const data = {...userData, ...books}  
    res.status(200).json({ data: data });
  } else {
    res.json({ message: "User data not found." });
  }
});

app.get("/authenticate", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Token is vallid." });
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

app.get("/swap/:user/:bookId", authenticateToken, (req, res) => {
  const user = usersData.find((user) => user.username === req.params.user);
  const book = user.booksAvailable.find(
    (book) => book.bookId === req.params.bookId
  );
  res.status(200).json({ data: book });
});

app.post("/signup", async (req, res) => {
  const { name, email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    username: username,
    email: email,
    password: hashedPassword,
  };

  const newUserData = {
    name: name,
    email: email,
    username: username,
    booksAvailable: [],
  };

  const foundExistingUser = !!users.find((user) => user.username === username);
  const foundExistingEmail = !!users.find((user) => user.email === email);

  if (foundExistingUser || foundExistingEmail) {
    return res
      .status(409)
      .json({ message: "username or e-mail already exists" });
  }
  users.push(newUser);
  usersData.push(newUserData);
  res.json({
    message: "Registration successful!",
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) {
    res.status(401).json({ message: "User not found." });
  } else {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username: user.username }, "SECRET", {
        expiresIn: 3600,
      });
      res.json({ token: token });
    } else {
      res.status(401).json({ message: "Incorrect password." });
    }
  }
});
