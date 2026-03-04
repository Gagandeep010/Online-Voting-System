# 🗳️ Secure Online Voting System - Developer Guide

> A comprehensive web-based voting platform with facial recognition authentication, blockchain integration, and multi-factor security.

## 🎯 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 5.0+
- Docker & Docker Compose
- Modern Web Browser (Chrome, Firefox, Safari, Edge)

### Setup (Development)

```bash
# 1. Clone the repository
git clone <repo-url>
cd Online-Voting-System

# 2. Setup Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration

# 3. Setup Frontend  
cd ../frontend
npm install
cp .env.example .env.local
# Edit .env.local with your backend URL

# 4. Start Docker services
cd ..
docker-compose up -d

# 5. Start backend (in new terminal)
cd backend
npm run dev

# 6. Start frontend (in another terminal)
cd frontend
npm start
```

Access the application at: `http://localhost:3000`

---

## 📁 Project Structure

```
Online-Voting-System/
├── backend/
│   ├── src/
│   │   ├── controller/        # API controllers
│   │   │   ├── SignupController.ts
│   │   │   ├── LoginController/
│   │   │   ├── VoteController.ts
│   │   │   └── FacialRecognitionController.ts
│   │   ├── models/           # MongoDB schemas
│   │   │   ├── centralizedDB.ts
│   │   │   ├── OtpModel.ts
│   │   │   └── Candidate.ts
│   │   ├── routes/           # API routes
│   │   │   ├── LoginRoutes.ts
│   │   │   ├── SignupRout.ts
│   │   │   ├── VotesRouts.ts
│   │   │   └── FacialRecognitionRoutes.ts
│   │   ├── utility/          # Helper functions
│   │   │   ├── FacialRecognitionService.ts
│   │   │   ├── BlockchainVoteService.ts
│   │   │   ├── AuthMiddleware.ts
│   │   │   ├── InputValidation.ts
│   │   │   └── StoreOtp.ts
│   │   ├── config/           # Configuration
│   │   │   └── centralizedDBConfig.ts
│   │   └── index.ts          # Main server file
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── FacialRecognition/
│   │   │   │   ├── FacialRecognition.tsx
│   │   │   │   └── FacialRecognition.css
│   │   │   ├── LoginSignUp/
│   │   │   ├── Dashboard/
│   │   │   ├── VotingArea/
│   │   │   ├── Results/
│   │   │   └── ...
│   │   ├── config/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   ├── models/           # Face-api.js models
│   │   └── index.html
│   ├── package.json
│   └── .env.example
│
├── blockchain/
│   ├── contracts/
│   │   ├── Election.sol
│   │   └── Migrations.sol
│   ├── test/
│   ├── migrations/
│   └── truffle-config.js
│
├── docker-compose.yml
├── Dockerfile.jenkins
├── nginx.conf
├── API_DOCUMENTATION.md
├── DEPLOYMENT_GUIDE.md
└── PRODUCTION_ROADMAP.md
```

---

## 🔐 Key Features

### ✅ Implemented
- **Multi-Factor Authentication**
  - Aadhar ID verification
  - OTP-based login
  - Facial recognition
  
- **Security**
  - JWT token-based authentication
  - Input validation and sanitization
  - Rate limiting
  - CORS protection
  - Security headers
  
- **Voting System**
  - Single vote per user enforcement
  - Vote casting with verification
  - Vote tally and results
  
- **Blockchain Integration**
  - Vote recording on blockchain
  - Transaction verification
  - Immutable vote ledger
  
- **Monitoring**
  - Prometheus metrics
  - Health checks
  - Logging system

### 🚀 Facial Recognition System

The facial recognition module provides:

1. **During Registration** - Capture and store facial embedding
2. **During Voting** - Verify facial identity
3. **Liveness Detection** - Prevent spoofing with photos
4. **Multiple Attempts Support** - Allow re-verification
5. **Attempt Tracking** - Limit verification attempts for security

**Technical Details:**
- Uses Face-api.js with TensorFlow.js
- 128-512 dimensional facial embeddings
- Cosine similarity matching
- Configurable similarity threshold (default: 0.6)

---

## 📚 API Endpoints

### Core Routes

**Authentication:**
- `POST /api/User/signup` - Create account
- `POST /api/login/getOtp` - Request OTP
- `POST /api/login/verifyOtp` - Verify OTP and get JWT

**Facial Recognition:**
- `POST /api/facial/register` - Register face
- `POST /api/facial/verify` - Verify face
- `GET /api/facial/status/:adharID` - Check status
- `POST /api/facial/reset` - Reset face data

**Voting:**
- `POST /api/votes/vote` - Cast vote
- `GET /api/votes/tally` - Get results
- `GET /api/votes/status/:adharID` - Check voting status

**System:**
- `GET /health` - Health check
- `GET /metrics` - Prometheus metrics
- `GET /api/docs` - API documentation

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for full details.

---

## 🔧 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/voting-system
JWT_SECRET=your_secret_key
BLOCKCHAIN_NODE_URL=http://localhost:8545
```

### Frontend (.env.local)
```
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_BLOCKCHAIN_NETWORK=http://localhost:8545
```

Details in `.env.example` files.

---

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

---

## 📊 Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 19, TypeScript, Axios, Web3.js |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | MongoDB, Mongoose |
| **Blockchain** | Ethereum, Solidity, Truffle, Ganache |
| **ML/AI** | TensorFlow.js, Face-api.js |
| **Monitoring** | Prometheus, Morgan |
| **Security** | JWT, Bcrypt, Helmet |
| **DevOps** | Docker, Docker Compose, Nginx |

---

## 🚀 Production Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for:
- Docker setup
- Database configuration
- SSL/TLS setup
- Load balancing
- Scaling strategies
- Backup & recovery

---

## 📈 Performance Considerations

### Database Optimization
- Index frequently queried fields
- Use pagination for large result sets
- Implement caching with Redis

### Frontend Optimization
- Code splitting with React.lazy
- Image optimization
- Gzip compression enabled
- CDN for static assets

### Backend Optimization
- Connection pooling for MongoDB
- Rate limiting enabled
- Request timeout configuration
- Compression enabled

---

## 🔐 Security Checklist

- [x] HTTPS/TLS encryption
- [x] OAuth/JWT authentication
- [x] Input validation & sanitization
- [x] SQL injection prevention
- [x] XSS protection
- [x] CSRF tokens
- [x] Rate limiting
- [x] API authentication
- [x] Database encryption
- [x] Secure headers
- [x] Password hashing (Bcrypt)
- [x] Multi-factor authentication

---

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Find and kill process using port
lsof -i :5000
kill -9 <PID>
```

**MongoDB Connection Error**
- Ensure MongoDB is running: `docker-compose up -d`
- Check connection string in `.env`
- Verify network connectivity

**Facial Recognition Not Working**
- Ensure camera permissions granted
- Check face-api models loaded
- Verify browser supports WebRTC

**Blockchain Connection Failed**
- Start blockchain node: `docker-compose up blockchain`
- Check `BLOCKCHAIN_NODE_URL`
- Verify network connectivity

---

## 📝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add some amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

### Code Standards
- Use TypeScript for type safety
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation

---

## 📄 License

This project is licensed under the ISC License.

---

## 📞 Support

For issues or questions:
- Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- Review [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- Check [PRODUCTION_ROADMAP.md](PRODUCTION_ROADMAP.md)

---

## 🙏 Acknowledgments

- Face-api.js for facial recognition
- TensorFlow.js for machine learning
- Truffle for smart contracts
- MongoDB for database
- Express for backend framework

---

**Last Updated:** March 4, 2024
**Version:** 1.0.0
