const express = require("express");
const accountRouter = express.Router();
const bcrypt = require("bcrypt");

const { pool } = require("../db");

accountRouter.post("/signup", async (req, res) => {
  const { name, email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Define the SQL query with placeholders
    const sqlInsertUser =
      "INSERT INTO Users (username, password) VALUES ($1, $2) RETURNING user_id";
    const sqlInsertUserInfo =
      "INSERT INTO UserInfo (user_id, name, email) VALUES ($1, $2, $3)";

    // Define the values to be inserted

    // Execute the prepared statements with parameters
    pool.query(sqlInsertUser, [username, password], (err, result) => {
      if (err) {
        console.error("Error inserting user:", err.stack);
        return;
      }

      const userId = result.rows[0].user_id;

      // Insert user information into UserInfo table
      pool.query(sqlInsertUserInfo, [userId, name, email], (err, result) => {
        if (err) {
          console.error("Error inserting user info:", err.stack);
          return;
        }

        console.log("User and user info inserted successfully");
        // Close the pool when done
        // pool.end();
      });
    });

    res
      .status(200)
      .json({ message: "New User Account was created successfully." });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Registration failed, please try again later." });
  }
});

module.exports = accountRouter;
