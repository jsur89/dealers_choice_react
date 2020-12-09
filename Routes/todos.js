const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("TODOS"));

module.exports = router;
