# Online Voting System - API Documentation

## Overview
This API provides secure endpoints for user authentication, facial recognition-based voter verification, and voting operations.

---

## Base URL
```
Development: http://localhost:5000
Production: https://api.onlinevotingsystem.com
```

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Endpoints

### 1. User Authentication

#### 1.1 User Signup
**POST** `/api/User/signup`

Create a new user account.

**Request Body:**
```json
{
  "user_name": "string",
  "phoneNumber": "string (10 digits)",
  "adharID": "string (12 digits)",
  "age": "number (18-120)"
}
```

**Response (201 Created):**
```json
{
  "message": "User created successfully",
  "user": {
    "adharID": "string",
    "user_name": "string",
    "phoneNumber": "string",
    "age": "number",
    "facialVerified": false
  }
}
```

**Error Response (409 Conflict):**
```json
{
  "message": "User already exists"
}
```

---

#### 1.2 Send OTP
**POST** `/api/login/getOtp`

Send OTP to user's registered phone number.

**Request Body:**
```json
{
  "adharID": "string (12 digits)"
}
```

**Response (200 OK):**
```json
{
  "message": "OTP sent successfully",
  "expiresIn": 300
}
```

---

#### 1.3 Verify OTP
**POST** `/api/login/verifyOtp`

Verify OTP and receive JWT token.

**Request Body:**
```json
{
  "adharID": "string",
  "otp": "string (6 digits)"
}
```

**Response (200 OK):**
```json
{
  "message": "OTP verified successfully",
  "token": "jwt_token_here"
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "Invalid OTP or OTP expired"
}
```

---

### 2. Facial Recognition

#### 2.1 Register Facial Embedding
**POST** `/api/facial/register`

Register facial embedding during signup.

**Request Body:**
```json
{
  "adharID": "string",
  "facialEmbedding": [number, number, ...]  // Array of 128-512 facial embedding values
}
```

**Response (200 OK):**
```json
{
  "message": "Facial embedding registered successfully",
  "user": {
    "adharID": "string",
    "user_name": "string",
    "facialVerified": true
  }
}
```

---

#### 2.2 Verify Facial Embedding
**POST** `/api/facial/verify`

Verify facial embedding during login/voting.

**Request Body:**
```json
{
  "adharID": "string",
  "facialEmbedding": [number, number, ...]
}
```

**Response (200 OK):**
```json
{
  "message": "Facial verification successful",
  "verified": true,
  "user": {
    "adharID": "string",
    "user_name": "string",
    "facialVerified": true
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "Facial verification failed",
  "attemptsRemaining": 3
}
```

**Error Response (429 Too Many Requests):**
```json
{
  "message": "Too many verification attempts. Please try again later."
}
```

---

#### 2.3 Get Facial Verification Status
**GET** `/api/facial/status/:adharID`

Check facial verification status for a user.

**Response (200 OK):**
```json
{
  "adharID": "string",
  "user_name": "string",
  "facialVerified": true,
  "lastFacialVerification": "2024-03-04T10:30:00Z",
  "facialVerificationAttempts": 0
}
```

---

#### 2.4 Reset Facial Embedding
**POST** `/api/facial/reset`

Reset facial embedding (allow user to re-register).

**Request Body:**
```json
{
  "adharID": "string"
}
```

**Response (200 OK):**
```json
{
  "message": "Facial embedding reset successfully",
  "user": {
    "adharID": "string",
    "user_name": "string",
    "facialVerified": false
  }
}
```

---

### 3. Voting

#### 3.1 Cast Vote
**POST** `/api/votes/vote`

Cast a vote for a candidate. Requires facial verification.

**Request Body:**
```json
{
  "adharID": "string",
  "candidateID": "string"
}
```

**Response (201 Created):**
```json
{
  "message": "Vote recorded successfully",
  "vote": {
    "userID": "string",
    "candidateID": "string",
    "blockchainTx": "0x...",
    "timestamp": "2024-03-04T10:30:00Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "You have already voted"
}
```

**Error Response (403 Forbidden):**
```json
{
  "message": "Facial verification required"
}
```

---

#### 3.2 Get Vote Tally
**GET** `/api/votes/tally`

Retrieve vote count for all candidates.

**Response (200 OK):**
```json
{
  "databaseTally": [
    {
      "_id": "candidateID",
      "count": 100
    }
  ],
  "blockchainVotes": {
    "candidateID": 100
  },
  "note": "Blockchain votes serve as tamper-proof verification"
}
```

---

#### 3.3 Check Voting Status
**GET** `/api/votes/status/:adharID`

Check if a user has voted.

**Response (200 OK):**
```json
{
  "adharID": "string",
  "user_name": "string",
  "hasVoted": false,
  "facialVerified": true
}
```

---

### 4. System Endpoints

#### 4.1 Health Check
**GET** `/health`

Check if the API is running.

**Response (200 OK):**
```json
{
  "status": "OK",
  "timestamp": "2024-03-04T10:30:00Z"
}
```

---

#### 4.2 Metrics
**GET** `/metrics`

Get Prometheus metrics (monitoring).

**Response:** Prometheus format metrics

---

#### 4.3 API Documentation
**GET** `/api/docs`

Get API endpoint documentation.

**Response (200 OK):**
```json
{
  "message": "Online Voting System API v1.0",
  "endpoints": { ... }
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 200  | OK - Request successful |
| 201  | Created - Resource created successfully |
| 400  | Bad Request - Invalid input |
| 401  | Unauthorized - Invalid credentials |
| 403  | Forbidden - Access denied |
| 404  | Not Found - Endpoint/resource not found |
| 429  | Too Many Requests - Rate limited |
| 500  | Internal Server Error - Server error |

---

## Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Headers:** `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

## Security Notes

1. **HTTPS Only:** Always use HTTPS in production
2. **JWT Expiry:** Tokens expire in 1 hour
3. **OTP Expiry:** OTP codes expire in 5 minutes
4. **Facial Verification:** Similarity threshold is 0.6 (out of 1.0)
5. **Max Attempts:** 5 failed facial verification attempts before lockout

---

## Examples

### Example: Complete Voting Flow

1. **Signup**
   ```bash
   POST /api/User/signup
   ```

2. **Send OTP**
   ```bash
   POST /api/login/getOtp
   ```

3. **Verify OTP**
   ```bash
   POST /api/login/verifyOtp
   ```

4. **Register Face** (during signup or in settings)
   ```bash
   POST /api/facial/register
   ```

5. **Verify Face** (before voting)
   ```bash
   POST /api/facial/verify
   ```

6. **Cast Vote**
   ```bash
   POST /api/votes/vote
   ```

7. **Check Results**
   ```bash
   GET /api/votes/tally
   ```

---

## Support

For issues or questions, please contact: support@onlinevotingsystem.com
