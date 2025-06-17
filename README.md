# 💼 WorkTrack Frontend

This is the **frontend** for **WorkTrack**, a smart job application tracker that helps users manage, update, and track job applications efficiently.

Built with **React**, **Vite**, and **Tailwind CSS**, the frontend provides a clean, responsive interface and connects to the Spring Boot backend via secure API requests.

---

## 🚀 Features

- 🔐 User authentication (JWT + Refresh token)
- ✅ Email confirmation flow
- 👤 View & update profile
- 📝 Add, edit, delete job applications
- 🎯 Change application status (Applied, Interview, Offer, Rejected)
- 📅 Store notes and application dates
- 🎨 Fully responsive UI with Tailwind CSS
- ⚠️ Protected routes (only visible after login)

---

## 🧰 Tech Stack

- **React** + **Vite**
- **React Router DOM**
- **Tailwind CSS**
- **Axios**
- Backend API: `Spring Boot` (see [WorkTrack backend](https://github.com/David-Fu-Code/WorkTrack))  
  *(replace with your actual link)*

---

## 📦 Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

## worktrack-frontend/
├── src/
│   ├── pages/           # Login, Register, Dashboard, etc.
│   ├── api.js           # Axios instance with interceptors
│   ├── App.jsx          # Routes and layout
│   └── main.jsx         # App entry point
├── public/
│   └── logo.png         # App favicon
├── tailwind.config.js
├── vite.config.js
└── index.html

## ScreensShots
![Home](https://github.com/user-attachments/assets/2f8b3d9a-96af-4a79-8c84-30bd8b8de9b8)
![DashBoard](https://github.com/user-attachments/assets/246c8886-565a-4038-88c1-6e4564962a43)
![Add Job](https://github.com/user-attachments/assets/908886fb-d6dd-4236-b667-4d898f0c0d93)
![All applications](https://github.com/user-attachments/assets/4793b01f-1cdc-415b-b97e-018b5d6d265b)




