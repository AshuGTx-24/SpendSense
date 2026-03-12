import prisma from "../config/prisma.js";

export const whatsappWebhook = async (req, res) => {
  try {

    const message = req.body.Body.trim().toLowerCase();
    const phone = req.body.From.replace("whatsapp:", "");

    console.log("Incoming message:", message);
    console.log("Phone:", phone);

    let amount = null;
    let category = null;
    let match;

    // Pattern 1: "spent 200 on food"
    match = message.match(/spent\s+(\d+)\s+on\s+(.+)/);
    if (match) {
      amount = Number(match[1]);
      category = match[2];
    }

    // Pattern 2: "paid 300 for taxi"
    if (!amount) {
      match = message.match(/paid\s+(\d+)\s+for\s+(.+)/);
      if (match) {
        amount = Number(match[1]);
        category = match[2];
      }
    }

    // Pattern 3: "200 food"
    if (!amount) {
      match = message.match(/^(\d+)\s+(.+)/);
      if (match) {
        amount = Number(match[1]);
        category = match[2];
      }
    }

    // Pattern 4: "food 200"
    if (!amount) {
      match = message.match(/^(.+)\s+(\d+)$/);
      if (match) {
        category = match[1];
        amount = Number(match[2]);
      }
    }

    // If parsing fails
    if (!amount || !category) {
      return res.send(`
<Response>
<Message>
I couldn't understand that.

Try formats like:
- 200 food
- food 200
- spent 300 on groceries
</Message>
</Response>
`);
    }

    // Find user by phone
    const user = await prisma.user.findUnique({
      where: { phoneNumber: phone }
    });

    if (!user) {
      return res.send(`
<Response>
<Message>
Please register first on SpendSense website.
</Message>
</Response>
`);
    }

    // Save expense
    await prisma.expense.create({
      data: {
        userId: user.id,
        amount,
        category,
        description: category,
        date: new Date()
      }
    });

    return res.send(`
<Response>
<Message>
Expense of ₹${amount} for ${category} recorded successfully!
</Message>
</Response>
`);

  } catch (error) {
    console.error(error);
    res.status(500).send("Webhook error");
  }
};