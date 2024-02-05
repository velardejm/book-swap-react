const express = require("express");
const accountRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { pool } = require("../db");

accountRouter.post("/signup", async (req, res) => {
  const { name, email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query("BEGIN");

    const sqlInsertUser =
      "INSERT INTO Users (username, password) VALUES ($1, $2) RETURNING id";
    const sqlInsertUserInfo =
      "INSERT INTO UsersInfo (id, name, email, user_id) VALUES ($1, $2, $3, $4)";

    const result = await pool.query(sqlInsertUser, [username, hashedPassword]);

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
