import express from "express";
import { createExpense, getUserExpenses, exportUserExpenses} from "../controllers/expense.controller.js";

const router = express.Router();

router.post("/expenses", createExpense);
router.get("/expenses/:userId", getUserExpenses);
router.get("/expenses/:userId/export", exportUserExpenses);

export default router;