import express from "express";

const router = express.Router();

import { signin, signup } from "../controllers/users.js";

router.post("/auth/signin", signin);
router.post("/auth/signup", signup);

export default router;
