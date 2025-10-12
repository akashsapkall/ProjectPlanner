# 🛠️ Mini Project Planner

![Visit App](https://project-planner-git-main-akash-sapkals-projects.vercel.app/)

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
git clone https://github.com/akashsapkall/mini-project-planner.git
cd mini-project-planner

# Backend setup
cd backend
npm install

# Frontend setup
cd ../frontend
npm install
```
# 🛠️ Mini Project Planner

A simple and efficient project planning tool built with modern web technologies.

---

## ⚙️ Configuration

### Backend `.env` Setup

| Variable        | Default                                         | Description           |
|----------------|-------------------------------------------------|-----------------------|
| PORT           | 5000                                            | Server port           |
| MONGODB_URI    | mongodb://localhost:27017/project-planner       | MongoDB URI           |
| JWT_SECRET     | *(your-secret)*                                 | JWT signing secret    |
| JWT_EXPIRES_IN | 30d                                             | JWT token lifetime    |

---
## 🗂️ Application Structure
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
---

## 🤝 Contributing

We welcome contributions!

1. **Fork the repository**
2. **Create a new branch**

```bash
git checkout -b feature/your-feature
git commit -m "Add feature"
git push origin feature/your-feature
```
---
## 📄 License
```
MIT License

Copyright (c) 2025 ProjectPlanner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```
