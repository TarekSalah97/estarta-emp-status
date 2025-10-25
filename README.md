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

## 📦 Database SQL

This repository includes a **`database.sql`** file containing:

- All table creations (`users`, `salaries`, and optional `logs`)
- Complete sample seed data

### Load it

```bash
# create the database (if not created yet)
psql -U postgres -h 127.0.0.1 -d postgres -c "CREATE DATABASE getempstatus;"

# apply schema + seed data
psql -U postgres -h 127.0.0.1 -d getempstatus -f database.sql
```

---

## ⚙️ Setup Instructions

### 1. Prerequisites

- Node.js (v18+)
- PostgreSQL (local)
- npm

### 2. Clone & install

```bash
git clone https://github.com/TarekSalah97/estarta-emp-status.git
cd get-emp-status
npm install
```

### 3. Configure environment variables

Create a .env file in the root:

```bash
PORT=3000
DATABASE_URL=postgres://postgres:12345678@127.0.0.1:5432/getempstatus
API_TOKEN=any-token-to-be-used-in-the-headers
NODE_ENV=development
```

### 4. Setup PostgreSQL database

```bash
psql -U postgres -h 127.0.0.1 -d postgres -c "CREATE DATABASE getempstatus;"
psql -U postgres -h 127.0.0.1 -d getempstatus -f database.sql
```

> **Windows tip (if `psql` is not recognized)**
>
> If you see: `psql : The term 'psql' is not recognized...`, add PostgreSQL’s **bin** folder to your PATH for the current PowerShell session, then rerun the commands:
>
> ```powershell
> # Change the version/path to match your installation
> $env:Path += ";C:\Program Files\PostgreSQL\16\bin"
>
> # Now run:
> psql -U postgres -h 127.0.0.1 -d postgres -c "CREATE DATABASE getempstatus;"
> psql -U postgres -h 127.0.0.1 -d getempstatus -f .\database.sql
> ```
>
> ⚠️ **Note:** The path above is just an example. Replace `16` (and the whole path if needed) with your installed PostgreSQL version/location, e.g.:
> `C:\Program Files\PostgreSQL\17\bin`

### 5. run the server

```bash
npm start
```

## API Documentation

After runing the server, Swagger UI available at:
👉 http://localhost:3000/docs

## Endpoint

POST /api/GetEmpStatus

### ✅ Endpoint Requirements

| Part        | Requirement                                                                         |
| ----------- | ----------------------------------------------------------------------------------- |
| **Headers** | `x-api-token` must be provided and must match the value in `.env` → `API_TOKEN=...` |
| **Body**    | JSON with field `NationalNumber` (required)                                         |

#### 🔐 Example Request (Headers + Body)

```http
POST /api/GetEmpStatus HTTP/1.1
Host: localhost:3000
Content-Type: application/json
x-api-token: any-token-to-be-used-in-the-headers

{
  "NationalNumber": "NAT1001"
}
```
