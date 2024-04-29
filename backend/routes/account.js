const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../db");

const accountRouter = express.Router();



accountRouter.post("/signup/:step", async (req, res) => {
  if (req.params.step === '1') {
    const { username, email } = req.body;
    // const sqlCheckRegistration = "SELECT EXISTS (SELECT 1 FROM users WHERE username = $1 OR email = $2) AS exists";
    const sqlCheckUsername = "SELECT EXISTS (SELECT 1 FROM users WHERE username = $1) AS usernameexists";
    const sqlCheckEmail = "SELECT EXISTS (SELECT 1 FROM users WHERE email = $1) AS emailexists";
    const usernameCheckResponse = await pool.query(sqlCheckUsername, [username]);
    const emailCheckResponse = await pool.query(sqlCheckEmail, [email]);
    const usernameExists = (usernameCheckResponse.rows[0].usernameexists);
    const emailExists = (emailCheckResponse.rows[0].emailexists);

    let errorMessage = null;

    if (usernameExists && emailExists) errorMessage = 'Username and email already exists';
    else if (usernameExists) errorMessage = 'Username  already exists';
    else if (emailExists) errorMessage = 'Email already exists';

    if (errorMessage) {
      res.status(409).json({ errorMessage: errorMessage });
    } else {
      res.status(200).send();
    }
  }


  if (req.params.step === '2') {
    const { name, email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await pool.query("BEGIN");

      const sqlInsertUser =
        "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3) RETURNING id";
      const sqlInsertUserInfo =
        "INSERT INTO UsersInfo (id, name, email, user_id) VALUES ($1, $2, $3, $4)";

      const result = await pool.query(sqlInsertUser, [username, email, hashedPassword]);

      await pool.query(sqlInsertUserInfo, [
        result.rows[0].id,
        name,
        email,
        result.rows[0].id,
      ]);

      pool.query("COMMIT");
      res.status(200).json({ message: "Account created successfully." });
    } catch (err) {
      pool.query("ROLLBACK");
      res.status(400).json({ message: "Account creation failed." });
    }
  }
});


accountRouter.post("/signup", async (req, res) => {
  const { name, email, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await pool.query("BEGIN");

    const sqlInsertUser =
      "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3) RETURNING id";
    const sqlInsertUserInfo =
      "INSERT INTO UsersInfo (id, name, email, user_id) VALUES ($1, $2, $3, $4)";

    const result = await pool.query(sqlInsertUser, [username, email, hashedPassword]);

    await pool.query(sqlInsertUserInfo, [
      result.rows[0].id,
      name,
      email,
      result.rows[0].id,
    ]);

    pool.query("COMMIT");
    res.status(200).json({ message: "Account created successfully." });
  } catch (err) {
    pool.query("ROLLBACK");
    res.status(400).json({ message: "Account creation failed." });
  }
});

accountRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const sqlGetPassword = "SELECT id, password FROM users WHERE username = $1";

  const pass = await pool.query(sqlGetPassword, [username]);

  if (pass.rows.length > 0) {
    const { id, password: savedPassword } = pass.rows[0];

    if (await bcrypt.compare(password, savedPassword)) {
      const token = jwt.sign({ userId: id, username: username }, "SECRET", {
        expiresIn: 3600,
      });

      res.status(200).json({ token: token });
    } else {
      res.status(401).json({ message: "Incorrect password." });
    }
  } else {
    res.status(401).json({ message: "User not found." });
  }
});

module.exports = accountRouter;
