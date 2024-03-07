const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// const authenticationRoutes = require("./routes/authentication");
const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/users");
const swapRoutes = require("./routes/swap");
const accountRoutes = require("./routes/account");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// app.use("/", authenticationRoutes);
app.use("/account", accountRoutes);
app.use("/books", bookRoutes);
app.use("/users", userRoutes);
app.use("/swap", swapRoutes);

app.listen(port, () => {});
