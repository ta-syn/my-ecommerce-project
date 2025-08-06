# Spondonhub API Documentation

This document provides details about the API endpoints for the Spondonhub e-commerce platform.

## Base URL
`/api/v1`

---

## Authentication

### 1. Register User
- **Endpoint:** `/auth/register`
- **Method:** `POST`
- **Access:** `Public`
- **Description:** Registers a new user account.
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```
**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully. Please login."
}
```

### 2. Login User
- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Access:** `Public`
- **Description:** Authenticates a user and returns a JWT.
- **Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```
**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "data": {
    "user": {
      "_id": "60d5ecb4b7c8e2a1e0f9d9f1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "isAdmin": false
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

<!-- Additional endpoints can be added below in the same format -->