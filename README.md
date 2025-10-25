# 🧾 GetEmpStatus Backend Service

**GetEmpStatus** is a structured backend service that retrieves employee information, processes salary data, and computes the employee’s status based on defined business logic.

---

## 🚀 Features

- RESTful API built with **Node.js + Express + TypeScript**
- PostgreSQL database
- Salary adjustment & tax deduction rules
- Robust error handling & validation
- API token authentication
- In-memory caching layer (NodeCache)
- Automatic retry mechanism for DB queries
- Centralized logging (console + optional DB)
- Swagger documentation for easy testing

---

---

## 🧩 Architecture Overview

| Layer               | Responsibility                                           |
| ------------------- | -------------------------------------------------------- |
| **Routes**          | Define API endpoints and map to logic layers             |
| **Core**            | Contains all business logic, validation, and data access |
| **Middlewares**     | Authentication, logging, and error handling              |
| **Utils**           | Reusable helpers (cache, logger, etc.)                   |
| **DB (PostgreSQL)** | Stores users and salaries                                |

---

## ⚙️ Setup Instructions

### 1. Prerequisites

- Node.js (v18+)
- PostgreSQL (local or Docker)
- npm or yarn

### 2. Clone & install

```bash
git clone https://github.com/TarekSalah97/estarta-emp-status.git
cd get-emp-status
npm install
```

## Configure environment variables

Create a .env file in the root:

```bash
PORT=3000
DATABASE_URL=postgres://postgres:<PASSWORD>@127.0.0.1:5432/getempstatus
API_TOKEN=super-secret-token
NODE_ENV=development
```

## Setup PostgreSQL database

```bash
psql -U postgres -h 127.0.0.1 -d postgres -c "CREATE DATABASE getempstatus;"
psql -U postgres -h 127.0.0.1 -d getempstatus -f database.sql
```

## run the server

```bash
npm start
```

## API Documentation

Swagger UI available at:
👉 http://localhost:3000/docs

## Endpoint

POST /api/GetEmpStatus
