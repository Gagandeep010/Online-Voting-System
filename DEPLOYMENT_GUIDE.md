# Production Deployment Guide

## Table of Contents
1. [Pre-Deployment Setup](#pre-deployment-setup)
2. [Environment Configuration](#environment-configuration)
3. [Docker Deployment](#docker-deployment)
4. [Database Setup](#database-setup)
5. [Blockchain Setup](#blockchain-setup)
6. [Security Hardening](#security-hardening)
7. [Monitoring & Logging](#monitoring--logging)
8. [Backup & Recovery](#backup--recovery)
9. [Scaling Considerations](#scaling-considerations)

---

## Pre-Deployment Setup

### Requirements
- Docker & Docker Compose 1.29+
- Node.js 18+
- MongoDB 5.0+
- Ethereum Node (Ganache/Geth/Infura)
- SSL Certificate
- Domain Name

### Setup Steps

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd Online-Voting-System
   ```

2. **Install Dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Create Environment Files**
   ```bash
   # Backend
   cp .env.example .env
   
   # Frontend
   cp .env.example .env.local
   ```

---

## Environment Configuration

### Backend (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/voting-system

# JWT
JWT_SECRET=<generate-strong-random-secret>
JWT_EXPIRY=1h

# Facial Recognition
FACIAL_SIMILARITY_THRESHOLD=0.6

# Blockchain
BLOCKCHAIN_NODE_URL=https://mainnet-infura-url
ELECTION_CONTRACT_ADDRESS=0x...

# CORS
CORS_ORIGIN=https://yourdomain.com

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000

# Security
ENCRYPTION_KEY=<generate-strong-random-key>
```

### Frontend (.env.local)

```env
REACT_APP_BACKEND_URL=https://api.yourdomain.com
REACT_APP_BLOCKCHAIN_NETWORK=https://mainnet-infura-url
REACT_APP_CONTRACT_ADDRESS=0x...
REACT_APP_ENVIRONMENT=production
```

---

## Docker Deployment

### 1. Build Docker Images

```bash
# Build all services
docker-compose build

# Or build individual services
docker build -t voting-backend:latest ./backend
docker build -t voting-frontend:latest ./frontend
```

### 2. Deploy with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 3. Production Docker Compose (With Reverse Proxy)

Create `docker-compose.prod.yml`:

```yaml
version: "3.8"

services:
  blockchain:
    image: trufflesuite/ganache-cli
    container_name: voting-blockchain
    ports:
      - "8545:8545"
    networks:
      - voting_network
    environment:
      - MNEMONIC=your-mnemonic-here

  mongodb:
    image: mongo:5.0
    container_name: voting-db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=secure_password
      - MONGO_INITDB_DATABASE=voting-system
    volumes:
      - mongodb_data:/data/db
    networks:
      - voting_network
    restart: unless-stopped

  backend:
    build: ./backend
    container_name: voting-backend
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://admin:secure_password@mongodb:27017/voting-system
      - JWT_SECRET=${JWT_SECRET}
      - BLOCKCHAIN_NODE_URL=http://blockchain:8545
    depends_on:
      - mongodb
      - blockchain
    networks:
      - voting_network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    build: ./frontend
    container_name: voting-frontend
    environment:
      - REACT_APP_BACKEND_URL=https://api.yourdomain.com
    networks:
      - voting_network
    restart: unless-stopped

  reverse-proxy:
    image: nginx:latest
    container_name: voting-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - /etc/letsencrypt:/etc/letsencrypt
    depends_on:
      - backend
      - frontend
    networks:
      - voting_network
    restart: unless-stopped

volumes:
  mongodb_data:

networks:
  voting_network:
    driver: bridge
```

---

## Database Setup

### MongoDB Atlas (Cloud)

1. Create account at mongodb.com
2. Create cluster
3. Add IP whitelist
4. Get connection string
5. Update `MONGODB_URI` in environment

### Local MongoDB

```bash
# Start MongoDB in Docker
docker run -d \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  -p 27017:27017 \
  mongo:5.0
```

---

## Blockchain Setup

### Using Infura (Recommended for Production)

1. Sign up at infura.io
2. Create project
3. Get API endpoint
4. Update `BLOCKCHAIN_NODE_URL`

### Using Local Ganache

```bash
docker run -d -p 8545:8545 trufflesuite/ganache-cli
```

### Deploy Smart Contract

```bash
cd blockchain
truffle migrate --network production
# Copy contract address to .env
```

---

## Security Hardening

### 1. SSL/TLS Certificates

```bash
# Using Let's Encrypt
sudo certbot certonly --standalone -d yourdomain.com

# Copy certificates
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem .
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem .
```

### 2. Nginx Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        proxy_pass http://backend:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### 3. Database Security

- Change default passwords
- Enable MongoDB authentication
- Restrict database access to internal network
- Regular backups

### 4. API Security

- Rate limiting enabled
- JWT authentication required
- CORS properly configured
- Input validation enabled
- SQL injection prevention
- XSS protection enabled

---

## Monitoring & Logging

### Prometheus Metrics

Access metrics at: `http://localhost:5000/metrics`

Monitor:
- Request count
- Response times
- Error rates
- Vote count

### Application Logs

```bash
# View logs
docker-compose logs backend

# Export logs
docker-compose logs backend > backend.log
```

### Log Aggregation (ELK Stack)

```yaml
# Add to docker-compose.yml
elasticsearch:
  image: docker.elastic.co/elasticsearch/elasticsearch:7.14.0
  # ... configuration

kibana:
  image: docker.elastic.co/kibana/kibana:7.14.0
  # ... configuration

filebeat:
  image: docker.elastic.co/beats/filebeat:7.14.0
  # ... configuration
```

---

## Backup & Recovery

### MongoDB Backup

```bash
# Backup
mongodump --uri "mongodb://admin:password@localhost:27017/voting-system" \
          --out backup-$(date +%Y%m%d)

# Restore
mongorestore --uri "mongodb://admin:password@localhost:27017" \
             backup-20240304
```

### Automated Daily Backup

```bash
#!/bin/bash
# backup.sh

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/backups/voting-system"

mkdir -p $BACKUP_DIR

# MongoDB backup
docker exec voting-db mongodump \
  --username admin \
  --password $MONGO_PASSWORD \
  --authenticationDatabase admin \
  --out $BACKUP_DIR/mongo-$TIMESTAMP

# Compress
tar -czf $BACKUP_DIR/mongo-$TIMESTAMP.tar.gz \
    $BACKUP_DIR/mongo-$TIMESTAMP

# Upload to S3 (or other backup service)
aws s3 cp $BACKUP_DIR/mongo-$TIMESTAMP.tar.gz \
    s3://voting-backups/

# Cleanup old backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
```

Schedule with crontab:
```bash
0 2 * * * /path/to/backup.sh  # Daily at 2 AM
```

---

## Scaling Considerations

### 1. Load Balancing

```nginx
upstream backend {
    least_conn;
    server backend1:5000;
    server backend2:5000;
    server backend3:5000;
}
```

### 2. Database Replication

Set up MongoDB replica set for high availability.

### 3. Caching

Implement Redis caching layer:
```yaml
redis:
  image: redis:latest
  container_name: voting-cache
  ports:
    - "6379:6379"
```

### 4. CDN

Use CloudFlare or AWS CloudFront for frontend delivery.

### 5. Horizontal Scaling

Scale backend services:
```bash
docker-compose up -d --scale backend=3
```

---

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check connection string
   - Verify IP whitelist
   - Ensure MongoDB is running

2. **Blockchain Connection Failed**
   - Check blockchain node URL
   - Verify network connectivity
   - Check contract address

3. **High CPU Usage**
   - Increase resources
   - Check for memory leaks
   - Enable compression

4. **Database Performance Issues**
   - Add indexes
   - Optimize queries
   - Increase database resources

---

## Maintenance

### Regular Tasks

- [ ] Monitor disk space
- [ ] Check log files
- [ ] Review metrics
- [ ] Test backups
- [ ] Update dependencies
- [ ] Security patches
- [ ] Database optimization

### Monthly Tasks

- [ ] Review and audit logs
- [ ] Test disaster recovery
- [ ] Performance analysis
- [ ] Security assessment

---

## Support & Updates

Check documentation: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
Check roadmap: [PRODUCTION_ROADMAP.md](PRODUCTION_ROADMAP.md)
