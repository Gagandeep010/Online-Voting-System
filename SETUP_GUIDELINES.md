# Online Voting System - Complete Setup Guidelines

This guide explains how to set up and run the Online Voting System project on any device, whether you're starting fresh or migrating from another machine.

---

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Prerequisites Installation](#prerequisites-installation)
3. [Project Setup](#project-setup)
4. [Environment Configuration](#environment-configuration)
5. [Running the Project](#running-the-project)
6. [Facial Recognition Models Setup](#facial-recognition-models-setup)
7. [Blockchain Setup](#blockchain-setup)
8. [Troubleshooting](#troubleshooting)
9. [Platform-Specific Instructions](#platform-specific-instructions)

---

## System Requirements

### Hardware
- **Processor**: Intel/AMD 64-bit processor (2+ GHz)
- **RAM**: Minimum 8GB (16GB recommended)
- **Storage**: 20GB free space
- **Network**: Stable internet connection

### Software (Required)
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Git**: Version 2.25.0 or higher
- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **Python**: Version 3.8 or higher (optional, for model download scripts)

### Browser Support
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Must support WebRTC for camera access

---

## Prerequisites Installation

### 1. Install Node.js

**Windows:**
```bash
# Download from https://nodejs.org/
# Choose LTS version (18.x or newer)
# Run the installer and follow prompts

# Verify installation
node --version
npm --version
```

**macOS:**
```bash
# Using Homebrew
brew install node

# Verify installation
node --version
npm --version
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 2. Install Git

**Windows:**
- Download from https://git-scm.com/download/win
- Run installer with default settings

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

### 3. Install Docker & Docker Compose

**Windows & macOS:**
- Download Docker Desktop from https://www.docker.com/products/docker-desktop
- Follow installation wizard
- Ensure Docker daemon is running

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install docker.io docker-compose

# Add user to docker group (avoid sudo)
sudo usermod -aG docker $USER
newgrp docker
```

### 4. Verify All Installations

```bash
node --version        # Should be v18.0.0 or higher
npm --version         # Should be 8.0.0 or higher
git --version         # Should be 2.25.0 or higher
docker --version      # Should be 20.10 or higher
docker-compose --version  # Should be 2.0 or higher
```

---

## Project Setup

### Step 1: Clone the Repository

```bash
# Clone from GitHub (replace with your actual repo URL)
git clone https://github.com/your-username/Online-Voting-System.git
cd Online-Voting-System

# Verify project structure
ls -la  # On Windows: dir
```

### Step 2: Install Frontend Dependencies

```bash
cd frontend

# Install all npm packages
npm install

# Verify installation
npm list react
npm list react-dom
npm list face-api.js

# Install additional peer dependencies if needed
npm install @types/react @types/react-dom --save-dev

cd ..
```

### Step 3: Install Backend Dependencies

```bash
cd backend

# Install all npm packages
npm install

# Verify installation
npm list express
npm list mongoose
npm list web3
npm list jsonwebtoken

cd ..
```

### Step 4: Verify Project Structure

```
Online-Voting-System/
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── backend/
│   ├── node_modules/
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── prometheus.yml
├── blockchain/
│   ├── contracts/
│   ├── migrations/
│   ├── test/
│   └── truffle-config.js
├── docker-compose.yml
└── README.md
```

---

## Environment Configuration

### Step 1: Create Backend Environment File

Create `backend/.env` file:

```bash
cd backend
```

Create `.env` file with the following content:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
BACKEND_URL=http://localhost:5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/online-voting-system
MONGODB_USER=voting_user
MONGODB_PASSWORD=voting_password_123

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
JWT_EXPIRY=7d

# Blockchain Configuration
BLOCKCHAIN_NETWORK=http://localhost:8545
BLOCKCHAIN_CONTRACT_ADDRESS=0x5FbDB2315678afccb333f8a9c4b37b1d8d9fd44a
BLOCKCHAIN_ACCOUNT_ADDRESS=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
BLOCKCHAIN_ACCOUNT_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb476c55263f4909147f7cc1d9955
BLOCKCHAIN_GAS_LIMIT=300000

# OTP Configuration
OTP_EXPIRY=600
OTP_LENGTH=6
MAX_OTP_ATTEMPTS=5

# Facial Recognition Configuration
FACIAL_SIMILARITY_THRESHOLD=0.6
FACIAL_MAX_ATTEMPTS=5
ENABLE_FACIAL_RECOGNITION=true

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=debug
ENABLE_LOGGING=true

# Security
ENABLE_HELMET=true
ENABLE_CORS=true
```

### Step 2: Create Frontend Environment File

Create `frontend/.env` file:

```bash
cd ../frontend
```

Create `.env` file with the following content:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_BACKEND_URL=http://localhost:5000

# Blockchain Configuration
REACT_APP_BLOCKCHAIN_URL=http://localhost:8545
REACT_APP_BLOCKCHAIN_CONTRACT_ADDRESS=0x5FbDB2315678afccb333f8a9c4b37b1d8d9fd44a

# Application Settings
REACT_APP_ENV=development
REACT_APP_ENABLE_FACIAL_RECOGNITION=true

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_DEBUG_MODE=false

# UI Settings
REACT_APP_THEME=light
```

---

## Running the Project

### Option 1: Using Docker Compose (Recommended)

```bash
# Navigate to project root
cd Online-Voting-System

# Start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Services Started:**
- MongoDB: `mongodb://localhost:27017`
- Backend API: `http://localhost:5000`
- Frontend App: `http://localhost:3000`
- Ganache (Blockchain): `http://localhost:8545`

### Option 2: Running Services Individually

#### Start MongoDB

```bash
# Using Docker
docker run -d \
  --name voting-mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=voting_user \
  -e MONGO_INITDB_ROOT_PASSWORD=voting_password_123 \
  -p 27017:27017 \
  mongo:5.0

# Verify connection
mongo mongodb://voting_user:voting_password_123@localhost:27017/admin
```

#### Start Ganache (Blockchain)

```bash
# Install Ganache CLI globally (if not already installed)
npm install -g ganache-cli

# Start Ganache
ganache-cli --deterministic --accounts 10 --host 0.0.0.0 --port 8545
```

#### Start Backend Server

```bash
cd backend

# Development mode with auto-reload
npm run dev

# Production mode
npm run build
npm start
```

**Backend running at:** `http://localhost:5000`

#### Start Frontend Application

```bash
cd frontend

# Development mode
npm start

# Production build
npm run build
```

**Frontend running at:** `http://localhost:3000`

---

## Facial Recognition Models Setup

### Automatic Download (Recommended)

A model download script is provided:

```bash
cd frontend

# Download models to public/models/
node download-models.js

# If script doesn't exist, follow manual setup below
```

### Manual Setup

1. Create models directory:
```bash
mkdir -p frontend/public/models
```

2. Download models from:
   - https://github.com/vladmandic/face-api/tree/master/model

3. Download these files:
   - `tiny_face_detector_model-weights_manifest.json`
   - `tiny_face_detector_model-shard1`
   - `face_landmark_68_model-weights_manifest.json`
   - `face_landmark_68_model-shard1`
   - `face_recognition_model-weights_manifest.json`
   - `face_recognition_model-shard1`

4. Place all files in `frontend/public/models/`

5. Verify setup:
```bash
ls -la frontend/public/models/  # macOS/Linux
dir frontend\public\models      # Windows
```

---

## Blockchain Setup

### Using Ganache CLI

```bash
# Install globally
npm install -g ganache-cli

# Start with deterministic account
ganache-cli --deterministic --accounts 10 --host 0.0.0.0 --port 8545
```

### Using Docker

```bash
docker run -d \
  --name ganache \
  -p 8545:8545 \
  trufflesuite/ganache:latest \
  --deterministic \
  --accounts 10 \
  --host 0.0.0.0
```

### Deploy Smart Contract

```bash
cd blockchain

# Compile contract
truffle compile

# Deploy to local blockchain
truffle migrate --network development

# Deploy to testnet (requires configuration)
truffle migrate --network ropsten  # or goerli, sepolia
```

### Verify Contract Deployment

```bash
# Check deployment logs
cat blockchain/build/contracts/Election.json

# Note the contract address from migration output
# Update REACT_APP_BLOCKCHAIN_CONTRACT_ADDRESS in .env
```

---

## Troubleshooting

### Issue: Port Already in Use

```bash
# Find process using port (macOS/Linux)
lsof -i :5000    # Backend
lsof -i :3000    # Frontend
lsof -i :27017   # MongoDB
lsof -i :8545    # Ganache

# Kill process
kill -9 <PID>

# Windows: Use Task Manager or
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: MongoDB Connection Failed

```bash
# Check if MongoDB is running
docker ps | grep mongo

# Restart MongoDB
docker stop voting-mongodb
docker rm voting-mongodb
docker-compose up -d mongodb
```

### Issue: Facial Recognition Models Not Loading

```bash
# Verify models exist
ls -la frontend/public/models/

# Clear browser cache and reload
# Check browser console for specific errors
# Ensure correct file permissions
chmod 644 frontend/public/models/*
```

### Issue: Blockchain Connection Error

```bash
# Check if Ganache is running
curl http://localhost:8545

# Restart Ganache
ganache-cli --deterministic --accounts 10 --host 0.0.0.0 --port 8545
```

### Issue: npm install Fails

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: TypeScript Compilation Errors

```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build

# Check tsconfig.json settings
```

---

## Platform-Specific Instructions

### Windows Setup

1. **Install Node.js:**
   - Download LTS from nodejs.org
   - Run .msi installer
   - Check "Add to PATH"

2. **Install Git:**
   - Download installer from git-scm.com
   - Use default options

3. **Install Docker:**
   - Download Docker Desktop for Windows
   - Enable WSL 2 backend
   - Restart computer after installation

4. **Use PowerShell or Command Prompt:**
   ```powershell
   # Clone repo
   git clone <repo-url>
   cd Online-Voting-System
   
   # Setup Node modules
   cd frontend && npm install
   cd ../backend && npm install
   ```

5. **Commands:**
   ```powershell
   # Start Docker services
   docker-compose up -d
   
   # Backend (separate terminal)
   cd backend
   npm run dev
   
   # Frontend (separate terminal)
   cd frontend
   npm start
   ```

### macOS Setup

1. **Install Homebrew (if not installed):**
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install Prerequisites:**
   ```bash
   brew install node git docker
   brew install --cask docker
   ```

3. **Start Docker:**
   ```bash
   # Start Docker Desktop app from Applications folder
   # or use: open -a Docker
   ```

4. **Setup Project:**
   ```bash
   git clone <repo-url>
   cd Online-Voting-System
   cd frontend && npm install
   cd ../backend && npm install
   ```

5. **Run Services:**
   ```bash
   docker-compose up -d
   ```

### Linux Setup

1. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install Docker:**
   ```bash
   sudo apt-get update
   sudo apt-get install docker.io docker-compose git
   sudo usermod -aG docker $USER
   newgrp docker
   ```

3. **Setup Project:**
   ```bash
   git clone <repo-url>
   cd Online-Voting-System
   cd frontend && npm install
   cd ../backend && npm install
   ```

4. **Run Services:**
   ```bash
   docker-compose up -d
   ```

---

## Verification Checklist

After setup, verify everything is working:

- [ ] Node.js and npm are installed
- [ ] Git is available
- [ ] Docker and Docker Compose are installed
- [ ] Project is cloned
- [ ] `.env` files are created in `frontend/` and `backend/`
- [ ] `npm install` completed successfully in both directories
- [ ] Facial recognition models are in `frontend/public/models/`
- [ ] MongoDB container is running
- [ ] Ganache is running
- [ ] Backend server starts without errors: `npm run dev`
- [ ] Frontend loads at `http://localhost:3000`
- [ ] Backend API responds: `curl http://localhost:5000/api/health`

---

## Access Points After Setup

Once everything is running:

- **Frontend App**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`
- **MongoDB**: `mongodb://voting_user:voting_password_123@localhost:27017/online-voting-system`
- **Ganache Blockchain**: `http://localhost:8545`
- **API Documentation**: See `API_DOCUMENTATION.md`

---

## Quick Start Commands

```bash
# Clone and setup (first time)
git clone <repo-url>
cd Online-Voting-System
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# Create .env files (see Environment Configuration section)

# Start all services
docker-compose up -d

# Start individual services (different terminals)
# Terminal 1: Frontend
cd frontend && npm start

# Terminal 2: Backend
cd backend && npm run dev

# Terminal 3: Ganache
ganache-cli --deterministic

# Terminal 4: Monitor logs
docker-compose logs -f
```

---

## Getting Help

For issues not covered here:

1. Check `QUICK_START.md` for initial setup
2. See `DEPLOYMENT_GUIDE.md` for production setup
3. Review `API_DOCUMENTATION.md` for API details
4. Check application logs: `docker-compose logs`
5. Check backend logs: `npm run dev` output
6. Check browser console (F12) for frontend errors

---

## Security Notes for New Installations

⚠️ **Important:** The `.env` files contain sensitive information:

1. **Change default values**: Update passwords and secret keys in `.env`
2. **Never commit `.env`**: Add to `.gitignore` (should already be done)
3. **Use strong passwords**: For MongoDB and JWT secret
4. **Generate new JWT secret**: Use `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
5. **Update blockchain accounts**: Use production accounts for testnet/mainnet
6. **Enable HTTPS**: In production, always use SSL/TLS certificates

---

## Next Steps After Setup

1. ✅ Complete this setup guide
2. 📖 Read `QUICK_START.md` for feature walkthrough
3. 📚 Review `API_DOCUMENTATION.md` for available endpoints
4. 🚀 See `DEPLOYMENT_GUIDE.md` for production deployment
5. 🔍 Check `PRODUCTION_CHECKLIST.md` before launching

---

**Last Updated**: March 4, 2026
**Version**: 1.0
**Status**: Production Ready
