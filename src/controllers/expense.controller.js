import prisma from "../config/prisma.js";
import ExcelJS from "exceljs";

// =======================
// CREATE EXPENSE
// =======================
export const createExpense = async (req, res) => {
  try {
    const { userId, amount, category, description, date } = req.body;

    if (!userId || !amount || !category || !description) {
      return res.status(400).json({
        message: "userId, amount, category and description are required"
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (Number(amount) <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than 0"
      });
    }

    const newExpense = await prisma.expense.create({
      data: {
        userId: Number(userId),
        amount: Number(amount),
        category,
        description,
        date: date ? new Date(date) : new Date()
      }
    });

    return res.status(201).json({
      message: "Expense recorded successfully",
      expense: newExpense
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

// =======================
// GET USER EXPENSES
// =======================
export const getUserExpenses = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required"
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const expenses = await prisma.expense.findMany({
      where: { userId: Number(userId) },
      orderBy: { date: "desc" }
    });

    return res.status(200).json({
      count: expenses.length,
      expenses
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

// =======================
// Export User Expense
// =======================


export const exportUserExpenses = async (req, res) => {
  try {
    const { userId } = req.params;

    // 1️⃣ Validate user
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // 2️⃣ Fetch expenses
    const expenses = await prisma.expense.findMany({
      where: { userId: Number(userId) },
      orderBy: { date: "desc" }
    });

    // 3️⃣ Create workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Expenses");

    // 4️⃣ Define columns
    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Category", key: "category", width: 20 },
      { header: "Description", key: "description", width: 30 },
      { header: "Date", key: "date", width: 25 }
    ];

    // 5️⃣ Add rows
    expenses.forEach(expense => {
      worksheet.addRow({
        id: expense.id,
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
        date: expense.date.toISOString()
      });
    });

    // 6️⃣ Set response headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=expenses_user_${userId}.xlsx`
    );

    // 7️⃣ Send file
    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error generating Excel file"
    });
  }
};