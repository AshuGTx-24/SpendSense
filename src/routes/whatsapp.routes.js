import express from "express";
import { whatsappWebhook } from "../controllers/whatsapp.controller.js";

const router = express.Router();

router.post("/whatsapp", whatsappWebhook);

export default router;