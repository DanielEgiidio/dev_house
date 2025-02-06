// Verifica o userClerkController para lembrar o que deve ser feito futuramente

import express from "express";
import { updateUser } from "../controllers/userClerkController";

const router = express.Router();

router.put("/:userId", updateUser);

export default router;
