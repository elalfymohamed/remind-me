const express = require("express");

const router = express.Router();

const { signin, signup } = require("../controllers/users.js");

router.post("/signin", signin);
router.post("/signup", signup);

// router.get("/myProfile", userData);

export default router;
