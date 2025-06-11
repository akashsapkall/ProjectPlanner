# 🛠️ Mini Project Planner

![Banner](https://via.placeholder.com/1200x400/1e1e1e/ffffff?text=Mini+Project+Planner)

## 📋 Project Synopsis

Mini Project Planner is a comprehensive project management tool that allows users to:

- Create projects with detailed information  
- Add tasks with durations and dependencies  
- Auto-calculate schedules based on dependencies  
- Visualize timelines via interactive Gantt charts  
- Handle authentication and project ownership  

Built with **MongoDB**, **Express.js**, **React**, and **Node.js** (MERN stack), styled using **Tailwind CSS**, the app follows a clean dark theme for intuitive workflows.

---

## 📚 Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Configuration](#configuration)  
- [API Endpoints](#api-endpoints)  
- [Application Structure](#application-structure)  
- [Contributing](#contributing)  
- [License](#license)  

---

## 🚀 Features

### 🔐 User Authentication
- Secure signup & login
- JWT-based sessions
- Protected routes

### 📁 Project Management
- Create/manage projects
- Dashboard with cards
- Project duration calculation

### ✅ Task Management
- Add task (name, duration, dependencies)
- Auto schedule calculation
- Gantt view and dependency links

### 📊 Visualization
- Gantt chart timeline
- Task durations
- Task table with full details

### 🎨 UI/UX
- Modern dark theme
- Responsive layout
- Modal-based forms
- Intuitive navigation

---

## 🧰 Tech Stack

### Frontend
- **React**
- **Tailwind CSS**
- **React Router**
- **Context API**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**

### Tools
- **Vite** (frontend build)
- **Nodemon** (backend reload)
- **Postman** (API testing)

---

## ⚙️ Installation

### 🔧 Prerequisites
- Node.js (v14+)
- MongoDB (v4.4+)
- npm (v7+)

### 🔨 Steps

```bash
# Clone repo
git clone https://github.com/your-username/mini-project-planner.git
cd mini-project-planner

# Backend setup
cd backend
npm install

# Frontend setup
cd ../frontend
npm install
```
---
## Application Structure
```
mini-project-planner/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```
