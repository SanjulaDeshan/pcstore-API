# 🖥️ PC Store API - ASP.NET Core 8

## 🚀 Overview
This project demonstrates how to build **scalable RESTful APIs** from scratch using **ASP.NET Core Web API**, **C#**, and **Entity Framework Core (Code-First)**.  
It implements best practices such as the **Repository Pattern**, **Dependency Injection**, **Automapper**, and **with Single Admin Authentication** using **JWT Authentication**.

---

## 🧠 Project Features

### 🏗️ Core Concepts
- Build REST APIs from scratch using **ASP.NET Core 8**
- Perform full **CRUD operations** on SQL Server using **Entity Framework Core**
- Implement **Code-First Migrations**
- Design APIs following **Domain-Driven Design (DDD)** principles
- Apply **Repository Pattern** for clean architecture

### ⚙️ Advanced Features
- **Single Admin Authentication**
- **JWT-based Authentication** for secure access
- **ASP.NET Identity PasswordHasher** for encrypted admin passwords
- **Change Password** endpoint for admin
- **Role-based Authorization** — only admin can create, update, delete
- **Swagger UI** & **Postman** support for API testing

### 🧩 Clean Code & Best Practices
- SOLID Principles, Dependency Injection
- Use of DTOs, Domain Models, and Repositories
- Automapper for DTO <-> Entity mapping
- Follows RESTful standards and conventions

---

## 🔐 Admin Authentication System

A minimal and secure authentication setup built using **ASP.NET Core 8** and **Entity Framework Core**, featuring:

- Single admin user (seeded on app startup)
- JWT authentication with role-based claims
- Secure password hashing using `PasswordHasher`
- Change password functionality for admin

---

## 🏗️ Project Structure

```
pcstore.API/
│
├── Controllers/
│   ├── AuthController.cs
│   ├── CategoryController.cs
│   ├── BrandController.cs
│   ├── ItemController.cs
│   └── ItemSpecificationController.cs
│
├── Data/
│   ├── PCStoreDbContext.cs
│   └── DbSeeder.cs
│
├── Models/
│   ├── Domain/
│   │   ├── Category.cs
│   │   ├── Brand.cs
│   │   ├── Item.cs
│   │   └── ItemSpecification.cs
│   └── DTO/
│       ├── LoginRequestDto.cs
│       ├── LoginResponseDto.cs
│       └── ChangePasswordRequestDto.cs
│
├── Repositories/
│   ├── ICategoryRepository.cs
│   ├── IBrandRepository.cs
│   ├── IItemRepository.cs
│   ├── IItemSpecificationRepository.cs
│   ├── ITokenRepository.cs
│   └── TokenRepository.cs
│
├── appsettings.json
└── Program.cs
```

---

## ⚙️ Configuration Steps

### 1️⃣ Update `appsettings.json`
```json
"ConnectionStrings": {
  "PCStoreConnectionString": "Server=YOUR_SERVER_NAME;Database=PCStoreDB;Trusted_Connection=True;TrustServerCertificate=True;"
},
"Jwt": {
  "Key": "your_super_secret_key_12345",
  "Issuer": "pcstore.api",
  "Audience": "pcstore_users"
}
```

### 2️⃣ Apply EF Core Migrations
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

> 💡 This creates the database and automatically seeds a default admin user.

---

## 👤 Default Admin Credentials

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `Admin@123` |
| Role | `Admin` |

You can modify these in `DbSeeder.cs`.

---

## 🧩 API Endpoints

### 🔹 Login
`POST /api/auth/login`
```json
{
  "username": "admin",
  "password": "Admin@123"
}
```
Response:
```json
{
  "token": "<JWT_TOKEN>",
  "username": "admin",
  "role": "Admin",
  "expiration": "2025-11-05T14:00:00Z"
}
```

### 🔹 Change Password
`POST /api/auth/change-password`  
**Authorization:** Bearer Token (JWT)

```json
{
  "oldPassword": "Admin@123",
  "newPassword": "NewPassword@456"
}
```
Response:
```json
{
  "message": "Password changed successfully."
}
```

---

## 🧠 How It Works

### Database Seeding
A default admin user is inserted automatically at startup.

### Password Hashing
Uses `PasswordHasher<User>` from ASP.NET Identity.

### JWT Token Generation
Includes:
- `username`
- `role`
- `expiration`

### 🧰 Technologies Used
- .NET 8 Web API
- Entity Framework Core 8
- SQL Server
- JWT Authentication
- ASP.NET Identity PasswordHasher
- Automapper

---

## 🧪 Testing in Swagger
Run the project:
```bash
dotnet run
```
Open Swagger at:
```
https://localhost:5001/swagger
```
- Use `/api/auth/login` to get a token.
- Click **Authorize** in Swagger and paste:
```
Bearer <your_token>
```
- Now you can access all protected endpoints.

---

## 🏁 How to Get Started

1. Clone the repo:
   ```bash
   git clone https://github.com/SanjulaDeshan/pcstore-api.git
   cd pcstore-api
   ```
2. Configure **SQL Server connection string** in `appsettings.json`.
3. Run migrations:
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```
4. Run the project:
   ```bash
   dotnet run
   ```
5. Open Swagger and test the API.


💬 **Author:** Sanjula D. Rajapaksha  
🗓️ **Last Updated:** November 2025
