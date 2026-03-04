# Quick Start Guide - 5 Minutes to Running System

## Prerequisites Check
```bash
node --version          # Should be 18+
npm --version          # Should be 9+
docker --version       # Docker needed
docker-compose --version  # Docker Compose needed
```

## Step 1: Clone and Setup (2 minutes)
```bash
# Clone repository
git clone <your-repo-url>
cd Online-Voting-System

# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Edit backend/.env if needed
# Edit frontend/.env.local if needed
```

## Step 2: Download Facial Recognition Models (1 minute)
```bash
# Create download script
cat > download-models.js << 'EOF'
const https = require('https');
const fs = require('fs');
const path = require('path');

const modelsUrl = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';
const modelsDir = path.join(__dirname, 'frontend/public/models');

if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

const models = [
  'tiny_face_detector_model-weights_manifest.json',
  'tiny_face_detector_model-weights_0.bin',
  'face_landmark_68_model-weights_manifest.json',
  'face_landmark_68_model-weights_0.bin',
  'face_recognition_model-weights_manifest.json',
  'face_recognition_model-weights_0.bin',
  'face_expression_model-weights_manifest.json',
  'face_expression_model-weights_0.bin'
];

async function downloadModel(filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(modelsDir, filename));
    https.get(modelsUrl + filename, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(path.join(modelsDir, filename));
      reject(err);
    });
  });
}

async function downloadAllModels() {
  console.log('📥 Downloading Face-api.js models...');
  try {
    for (const model of models) {
      await downloadModel(model);
    }
    console.log('✅ All models downloaded successfully!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

downloadAllModels();
EOF

# Run the script
node download-models.js
```

## Step 3: Start Docker Services (1 minute)
```bash
# Start all services
docker-compose up -d

# Verify services are running
docker-compose ps

# Check logs
docker-compose logs -f blockchain  # Check blockchain
```

## Step 4: Install Dependencies (1 minute)
```bash
# Terminal 1: Backend
cd backend
npm install
npm run dev

# Terminal 2: Frontend (new terminal)
cd frontend
npm install
npm start
```

## Access the System

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:3000 | User voting interface |
| **Backend** | http://localhost:5000 | API server |
| **API Docs** | http://localhost:5000/api/docs | API reference |
| **Health Check** | http://localhost:5000/health | System status |
| **Metrics** | http://localhost:5000/metrics | Prometheus metrics |
| **MongoDB** | mongodb://localhost:27017 | Database |
| **Blockchain** | http://localhost:8545 | Ethereum node |

---

## Complete Voting Flow Test

### 1. Signup
```bash
curl -X POST http://localhost:5000/api/User/signup \
  -H "Content-Type: application/json" \
  -d '{
    "user_name": "John Voter",
    "phoneNumber": "9876543210",
    "adharID": "123456789012",
    "age": 25
  }'
```

### 2. Request OTP
```bash
curl -X POST http://localhost:5000/api/login/getOtp \
  -H "Content-Type: application/json" \
  -d '{
    "adharID": "123456789012"
  }'
```

### 3. Verify OTP
```bash
# Get OTP from logs or database
curl -X POST http://localhost:5000/api/login/verifyOtp \
  -H "Content-Type: application/json" \
  -d '{
    "adharID": "123456789012",
    "otp": "123456"  # Check backend logs for actual OTP
  }'
```

### 4. Register Facial Embedding (via Frontend)
- Go to http://localhost:3000 after OTP verification
- Click "Register Face"
- Allow camera access
- Face will be captured automatically
- Click "Submit Face Data"

### 5. Cast Vote
```bash
# After facial verification
curl -X POST http://localhost:5000/api/votes/vote \
  -H "Content-Type: application/json" \
  -d '{
    "adharID": "123456789012",
    "candidateID": "candidate1"
  }'
```

### 6. Check Results
```bash
curl http://localhost:5000/api/votes/tally
```

---

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process
lsof -i :5000
kill -9 <PID>
```

### Docker Issues
```bash
# View logs
docker-compose logs -f backend

# Restart services
docker-compose restart

# Full reset
docker-compose down -v
docker-compose up -d
```

### Models Not Found
```bash
# Verify models are downloaded
ls frontend/public/models/

# Should contain .bin and .json files
```

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
docker-compose ps mongodb

# View MongoDB logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb
```

### Facial Recognition Not Working
- Check browser console for errors
- Ensure camera permissions granted
- Try refreshing the page
- Check models are loaded in browser DevTools

---

## Common Commands

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb

# Stop everything
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild containers
docker-compose up -d --build

# Get shell access to container
docker exec -it voting-backend bash

# Database shell access
docker exec -it voting-mongodb mongosh
```

---

## Next Steps

1. **Explore API Documentation**: http://localhost:5000/api/docs
2. **Read Developer Guide**: See [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)
3. **Check Implementation**: See [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)
4. **Production Deployment**: See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Internet/Voters                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     └──────────────────┐
                                       │
                    ┌──────────────────┴───────────────┐
                    │                                  │
        ┌───────────▼─────────────┐         ┌────────▼─────────┐
        │     Frontend             │         │    Nginx Proxy   │
        │  (React + Face-api)     │         │ (SSL/Load Balance)│
        │                         │         │                  │
        │ • Voting Interface      │         │ • HTTPS Support  │
        │ • Facial Recognition    │         │ • Rate Limiting  │
        │ • Blockchain Voting     │         │ • Security       │
        └────────────┬─────────────┘         └────────┬─────────┘
                     │                               │
                     └───────────────────┬───────────┘
                                        │
                    ┌───────────────────▼──────────────────┐
                    │      Backend (Node.js + Express)    │
                    │                                     │
                    │ • User Authentication              │
                    │ • Facial Recognition               │
                    │ • Vote Processing                  │
                    │ • Blockchain Integration           │
                    │ • API Endpoints                    │
                    └───────────┬─────────────┬──────────┘
                                │             │
                ┌───────────────┼─────────────┤
                │               │             │
      ┌─────────▼──┐  ┌────────▼────┐  ┌───▼─────────┐
      │  MongoDB   │  │  Blockchain │  │ Prometheus  │
      │ Database   │  │  (Ganache)  │  │  Metrics    │
      │            │  │ Smart       │  │             │
      │ • Users    │  │ Contracts   │  │ • Monitoring│
      │ • Votes    │  │ • Voting    │  │ • Logging   │
      │ • Tokens   │  │ • Records   │  │             │
      └────────────┘  └─────────────┘  └─────────────┘
```

---

## Performance Tips

- **First Load**: Facial recognition models load on first use (~1-2 seconds)
- **Caching**: Browser caches models for faster subsequent loads
- **Compression**: API responses are gzip-compressed
- **Rate Limiting**: 100 requests/15 minutes per IP by default

---

**Ready to test Secure Online Voting System! 🗳️**

For detailed documentation, see other markdown files in the project root.
