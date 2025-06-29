# 🧑‍💼 Agent Contact Distribution System

This is a full-stack MERN application that allows Admins to upload contacts via CSV/XLS files and auto-distributes them equally among 5 agents. It includes secure authentication, protected routes, and a clean dashboard UI.

---

## 🚀 Live Demo

- **Frontend** (Vercel): [https://agent-system-chi.vercel.app](https://agent-system-chi.vercel.app)
- **Backend** (Render): [https://agent-system-bp82.onrender.com](https://agent-system-bp82.onrender.com)

---

## 🛠️ Tech Stack

| Frontend     | Backend           | Database        |
| ------------ | ----------------- | --------------- |
| React + Vite | Node.js + Express | MongoDB (Atlas) |
| TailwindCSS  | JWT + bcrypt      | mongoose        |

---

## 📦 Features

- 🔐 Admin Login
- 📁 Upload CSV/XLS Contact File
- 🤖 Automatically Distribute Contacts to 5 Agents
- 📇 View Agent-wise Contacts
- 🌐 Protected Routes with JWT
- 📂 File Upload with Multer

---

## 📁 Project Structure

agent-system/
├── client/ # React Frontend
│ └── dist/ # Vite Build Output
├── server/ # Node.js + Express Backend
│ └── uploads/ # Uploaded CSV/XLSX Files
└── README.md

---

## 🧪 Test Credentials

| Role  | Email             | Password |
| ----- | ----------------- | -------- |
| Admin | admin@example.com | 12345    |

> ⚠️ You may replace these with real credentials in `.env` file and MongoDB.

---

## ⚙️ Setup Instructions (Local Development)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/agent-system.git
cd agent-system

cd server
npm install

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

cd ../client
npm install

# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
cd client
npm run dev

---

### 🧠 Tips

- Replace `yourusername`, `your_demo_link`, and credentials if needed.
- You can also generate a fancy README from:
  👉 [https://readme.so](https://readme.so/) – easy drag & drop builder.

Would you like me to generate and upload this into your repo or give it as a downloadable `.md` file?
```
