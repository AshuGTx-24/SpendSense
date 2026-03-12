import prisma from "../config/prisma.js";
import { sendWelcomeMessage } from "../services/twilio.service.js";

export const registerUser = async (req, res) => {

  try {

    // extract data from request
    let { name, phoneNumber } = req.body;

    // normalize phone number
    phoneNumber = phoneNumber?.trim();

    // 1️⃣ validation
    if (!phoneNumber) {
      return res.status(400).json({
        message: "Phone number is required"
      });
    }

    // 2️⃣ check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { phoneNumber }
    });

    // If user exists → login instead of error
    if (existingUser) {
      return res.status(200).json({
        message: "Welcome back!",
        user: existingUser
      });
    }

    // 3️⃣ create new user
    const newUser = await prisma.user.create({
      data: {
        phoneNumber,
        name
      }
    });
    //send whatsapp welcome message
    await sendWelcomeMessage(phoneNumber);

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Registration failed"
    });

  }

};