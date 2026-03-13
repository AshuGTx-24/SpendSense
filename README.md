# 💰 SpendSense

**SpendSense** is a WhatsApp-based expense tracking system that allows users to record and manage expenses simply by sending messages through WhatsApp.
The system processes incoming messages using the **Twilio WhatsApp API**, extracts expense information, and stores it securely in a database.

This project demonstrates **real-world backend architecture**, webhook handling, API integrations, and database management.

---

## 🚀 Features

* 📲 Log expenses through WhatsApp messages
* ⚡ Real-time message processing via **Twilio Webhooks**
* 🧠 Automatic parsing of expense text
* 🗂️ Structured storage of expenses in a database
* 🔐 User authentication support
* 📊 Expense tracking and management
* 🏗️ Clean backend architecture using controllers, routes, and services

---

## 🏗️ System Architecture

```
User (WhatsApp)
      │
      ▼
Twilio WhatsApp API
      │
      ▼
Webhook Endpoint (Node.js / Express)
      │
      ▼
Message Parser
      │
      ▼
Expense Controller
      │
      ▼
Database (Prisma ORM)
```

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js

### Messaging API

* Twilio WhatsApp API

### Database

* Prisma ORM
* SQLite / PostgreSQL

### Other Tools

* ngrok (for webhook testing)
* Git & GitHub (version control)

---

## 📂 Project Structure

```
Project_SpendSense
│
├── prisma
│   ├── migrations
│   ├── dev.db
│   └── schema.prisma
│
├── src
│   ├── config
│   │   └── prisma.js
│   │
│   ├── controllers
│   │   ├── auth.controller.js
│   │   ├── expense.controller.js
│   │   └── whatsapp.controller.js
│   │
│   ├── routes
│   │   ├── auth.routes.js
│   │   ├── expense.routes.js
│   │   └── whatsapp.routes.js
│   │
│   ├── services
│   │   └── twilio.service.js
│   │
│   └── server.js
│
├── public
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/spendsense.git
cd spendsense
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Setup environment variables

Create a `.env` file in the root directory.

```
DATABASE_URL="file:./dev.db"
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number
```

---

### 4️⃣ Setup database

Run Prisma migrations:

```bash
npx prisma migrate dev
```

---

### 5️⃣ Start the server

```bash
npm start
```

Server will start on:

```
http://localhost:3000
```

---

## 📲 WhatsApp Expense Example

Users can send a message like:

```
Lunch 250
```

The system automatically extracts:

* **Category:** Lunch
* **Amount:** 250

And stores it in the database.

---

## 🔗 Webhook Setup (Twilio)

Set your Twilio webhook to:

```
http://your-server-url/whatsapp
```

For local testing:

```
ngrok http 3000
```

Then use the generated **ngrok URL** in the Twilio console.

---

## 📊 Future Improvements

* AI-based expense categorization
* Monthly analytics dashboard
* Budget alerts via WhatsApp
* CSV / Excel export
* Mobile dashboard

---

## 👨‍💻 Author

**Ashutosh Mohanty**
Software Engineer | Full Stack Developer

Technologies:
React.js • Node.js • JavaScript • APIs • Cloud

---

## ⭐ Support

If you found this project helpful, please consider **starring the repository** ⭐



