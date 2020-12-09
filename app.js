const express = require("express");
const app = express();
const cors = require("cors");
const { init, Todo } = require("./db.js");
const { Pool } = require("pg");
const path = require("path");

//middleware (always use app.use when requiring middleware...)
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "./dist")));

// // ROUTES =====================================
// app.post("/todos", async (req, res) => {
//   //await (waits for the function to complete before it continues)
//   try {
//     const {description} = req.body;
//     const newTodo = await Pool.
//   } catch (error) {
//     console.log(error.message);
//   }
// });

const port = 5000;
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.listen(port, () => {
  console.log(`Server running. Listening on Port ${port}...`);
});
