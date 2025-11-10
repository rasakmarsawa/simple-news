# 📰 Simple News

A simple social-media-like web application where users can connect with others, share what they’re thinking, and see posts from people they follow.

---

## 🌟 Overview

**Simple News** is a lightweight social platform built using the **MERN** stack with **MySQL** as the database.  
It allows users to:
- Post thoughts or updates
- Find and follow other users
- View posts from people they follow in a personalized feed

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React (Vite) |
| Backend | Node.js, Express |
| Database | MySQL |
| ORM | Sequelize |
| Containerization | Docker, Docker Compose V2 |

---

## ✨ Features

- 🧑‍🤝‍🧑 **User System** — Register and log in to the app  
- 🗣️ **Post System** — Create and view posts from followed users  
- 🔍 **Find People** — Search for other users to follow  
- 📰 **Feed** — See posts from the people you follow  
- 🔐 **Authentication** — Secure JWT-based authentication  

---

## 🧩 Project Structure

```
.
├── backend
│   ├── app.js
│   ├── config
│   ├── controllers
│   ├── Dockerfile
│   ├── middlewares
│   ├── migrations
│   ├── models
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── routes
│   ├── seeders
│   └── server.js
├── docker-compose.yml
├── folder_structure.txt
└── frontend
    ├── Dockerfile
    ├── eslint.config.js
    ├── index.html
    ├── node_modules
    ├── package.json
    ├── package-lock.json
    ├── public
    ├── README.md
    ├── src
    └── vite.config.js

14 directories, 14 files

```

---

## 📝 Design Notes

**Simple News** is designed with simplicity, scalability, and maintainability in mind:

- **Architecture** — Built with a **MERN stack** and **MySQL** database for structured data and relational consistency. React handles the frontend, while Express/Node.js provides a RESTful API backend.  
- **Folder Structure** — Separation of concerns: controllers, models, routes, middlewares, and seeders are organized for clarity and easier maintenance.  
- **Authentication** — Uses **JWT-based authentication** for stateless and secure user sessions.  
- **Feed Logic** — The backend queries posts from the users a person follows, orders them by creation time, and returns them to the frontend for display. No additional processing is done beyond the database query.  
- **Docker & Deployment** — Containers ensure consistent environments across development and production. `docker-compose` simplifies orchestration of frontend, backend, and database services.  
- **Scalability** — Designed to allow easy addition of new features such as comments, likes, or notifications without major refactoring.  

---

## 🚀 Installation & Setup

### 🧰 Prerequisites

Make sure you have these installed on your system:

* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose V2](https://docs.docker.com/compose/)

---

### ⚙️ 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/simple-news.git
cd simple-news
```

---

### 📄 2. Set Up Environment Variables

Copy the example environment file and adjust as needed:

```bash
cp backend/.env.example backend/.env
```

> ⚙️ Set `NODE_ENV=development` to automatically run database migrations and seed initial data during container startup.

If you need a random JWT secret, generate it with **OpenSSL**:

```bash
openssl rand -hex 64
```

---

### 🐳 3. Run with Docker Compose

From the project root:

```bash
docker compose up --build
```

This will:

* Start the **MySQL** container
* Build and run the **backend**
* Build and run the **frontend**

Services will be available at:

* 🖥️ Frontend → `http://localhost:5173`
* ⚙️ Backend → `http://localhost:5000`

---

### 🧠 4. Database Migration & Seeding (Production)

If `NODE_ENV` is **not** set to `development`, migrations and seeds must be done manually.

Open a shell in the backend container:

```bash
docker compose exec backend bash
```

Then run:

```bash
npm run db:migrate
npm run db:seed
```

---

### 🌐 5. Deployment Setup

Current deployment configuration:

| Component    | Platform                             |
| ------------ | ------------------------------------ |
| **Frontend** | [Vercel](https://vercel.com)         |
| **Backend**  | [Railway](https://railway.app)       |
| **Database** | [Railway MySQL](https://railway.app) |

---

## 🧪 Testing

> 📄 [Test Case Documentation](TEST_CASES.md)

---

## 📘 API Documentation

> 🧾 [View API Documentation on Postman](https://documenter.getpostman.com/view/6095804/2sB3WtqxrH)

---

## 🌍 Deployment

> 🔗 [Live Demo / Deployment Link](https://simple-news-iota.vercel.app)

---

## 🖼️ Screenshots

> <img width="1300" height="736" alt="Screenshot from 2025-11-10 14-56-14" src="https://github.com/user-attachments/assets/acf95b4c-5147-4a46-a442-a0d18e240961" />

> <img width="1300" height="736" alt="Screenshot from 2025-11-10 14-56-31" src="https://github.com/user-attachments/assets/17e83786-104c-4b78-811f-46ff0e1a9cd2" />


---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## 👨‍💻 Author

**Simple News** is developed by Muhammad Yoga Affella Putra  
Connect with me on [LinkedIn](https://linkedin.com/in/yogaaffella) 🌐

Feel free to reach out or contribute!

---

