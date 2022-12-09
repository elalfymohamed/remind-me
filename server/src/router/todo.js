const express = require("express");

const { auth } = require("../middleware/auth");

const { createTodo } = require("../controllers/todo");

const router = express.Router();

router.post("/", auth, createTodo);

module.exports = router;
