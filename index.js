const express = require("express");
const app = express();
const cors = require("cors");
const { init, Todo } = require("./db.js");

//middleware (always use app.use when requiring middleware...)
app.use(cors());
app.use(express.json());

//ROUTES =====================================

// app.post("/todos", async (req, res) => {
//   //await (waits for the function to complete before it continues)
//   try {
//     con;
//   } catch (error) {
//     console.log(error.message);
//   }
// });

const port = 5000;
app.listen(port, () => {
  console.log(`Server running. Listening on Port ${port}...`);
});
