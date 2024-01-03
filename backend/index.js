const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {loadData} = require('./utils/helper');

const app = express();
const port = 3001;

let users = [
  {
    name: "Name",
    email: "email@email.com",
    username: "username",
    password: "$2b$10$/35QC92KG2EO3TsOIgOqaOYZh3gce9SyHOIK9SM79YG8VfrrH7ykq",
  },
];

let newUsers = [];

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Listening to requests from port ${port}`);
});

app.get("/", (req, res) => {
  const usersData = loadData();
  const userListings = usersData.map((user) => {
    return {
      user: user.username,
      bookListings: user.booksAvailable
    }
  });
  console.log(userListings);
  
  console.log("A request was received from React.");
  res.json({
    response: "response data",
  });
});

app.post("/signup", async (req, res) => {
  const { name, email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    name: name,
    email: email,
    username: username,
    password: hashedPassword,
  };

  const foundExistingUser = !!users.find((user) => user.username === username);
  const foundExistingEmail = !!users.find((user) => user.email === email);

  if (foundExistingUser || foundExistingEmail) {
    //   throw new Error("username or email already exists.");
    return res
      .status(409)
      .json({ message: "username or e-mail already exists" });
  }
  users.push(newUser);
  res.json({
    message: "Registration successful!",
  });
});

app.get("/protected", authenticateToken, (req, res) => {
  const user = users.find((u) => u.username === req.user.username);
  if (user) {
    const { username, password, ...userData } = user;
    res.json(userData);
  } else {
    res.json({ message: "User data not found." });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).send("Token not provided.");
  }

  jwt.verify(token, "SECRET", (err, user) => {
    if (err) {
      return res.status(401).send("Invalid token.");
    } else {
      req.user = user;
      next();
    }
  });
}

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) {
    res.status(401).json({ message: "User not found." });
  } else {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username: user.username }, "SECRET", {
        expiresIn: 300,
      });
      res.json({ token: token });
    } else {
      res.status(401).json({ message: "Incorrect password." });
    }
  }
});
