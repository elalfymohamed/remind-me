import express from "express";

const router = express.Router();

import { signin, signup } from "../controllers/users.js";

router.post("/signin", signin);
router.post("/signup", signup);

// router.get("/myProfile", userData);

export default router;
