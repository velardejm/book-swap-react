const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Listening to requests from port ${port}`);
});

app.get("/", (req, res) => {
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
  console.log(users);
  res.json({
    message: "Registration successful!",
  });
});

app.get('/protected', (req, res) => {
  
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
}


app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) {
    res.status(401).json({ message: "User not found." });
  } else {
    if (await bcrypt.compare(password, user.password)) {
      console.log("correct password");
      const token = jwt.sign({ username: user.username }, "SECRET", {
        expiresIn: 300,
      });
      res.json({ token: token });
    } else {
      res.status(401).json({ message: "Incorrect password." });
    }
  }
});
