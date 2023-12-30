const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const port = 3001;

let users = [];

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
    return res.status(409).json({ message: "username or e-mail already exists" });
  }
  users.push(newUser);
  console.log(users);
  res.json({
    message: "Registration successful!",
  });
});
