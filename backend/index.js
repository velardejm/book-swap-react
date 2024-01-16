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
    username: "booklover1",
    password: "$2b$10$/35QC92KG2EO3TsOIgOqaOYZh3gce9SyHOIK9SM79YG8VfrrH7ykq",
  },
  {
    username: "readingfanatic",
    password: "$2b$10$/35QC92KG2EO3TsOIgOqaOYZh3gce9SyHOIK9SM79YG8VfrrH7ykq",
  },
];

let usersData = [
  {
    name: "User 1",
    username: "booklover1",
    email: "booklover1@example.com",
    booksAvailable: [
      {
        bookId: "1a",
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Fiction",
        condition: "Like New",
      },
      {
        bookId: "1b",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        condition: "Good",
      },
    ],
  },
  {
    name: "User 2",
    username: "readingfanatic",
    email: "readingfanatic@example.com",
    booksAvailable: [
      {
        bookId: "2a",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        condition: "Very Good",
      },
      {
        bookId: "2b",
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        condition: "Fair",
      },
    ],
  },
];

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  usersData = loadData();
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
    const { username } = user;

    const userDetail = usersData.find((u) => u.username === username);

    const data = { ...userDetail };

    res.status(200).json({ data: data });
  } else {
    res.json({ message: "User data not found." });
  }
});

app.get("/authenticate", authenticateToken, (req, res) => {
  res.status(200).json({ user: req.user.username });
});

app.get("/swap/:owner/:bookId", authenticateToken, (req, res) => {
  console.log(req.params);
  const user = usersData.find((user) => user.username === req.params.owner);
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
    password: hashedPassword,
  };

  const newUserData = {
    name: name,
    email: email,
    username: username,
    booksAvailable: [],
  };

  const foundExistingUser = !!users.find((user) => user.username === username);
  const foundExistingEmail = !!usersData.find((user) => user.email === email);

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
      res.status(200).json({ token: token });
    } else {
      res.status(401).json({ message: "Incorrect password." });
    }
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
      // data: userData
    });
  }
});

app.post("/swap/:owner/:bookId/:user", authenticateToken, (req, res) => {
  console.log(req.user);
});
