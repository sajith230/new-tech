# Docker Setup Guide

## Prerequisites
- Docker and Docker Compose installed
- DockerHub account

## Local Development

### 1. Set up environment variables
```bash
cp .env.example .env
# Edit .env and set your DOCKERHUB_USERNAME
```

### 2. Build and run with Docker Compose
```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 3. Access services
- Client: http://localhost:3000
- Server: http://localhost:8080

## Production Deployment

### CI/CD Setup (GitHub Actions)

1. **Create DockerHub Access Token**
   - Go to DockerHub → Account Settings → Security
   - Create new access token

2. **Configure GitHub Secrets**
   Go to GitHub repository → Settings → Secrets and add:
   - `DOCKERHUB_USERNAME`: Your DockerHub username
   - `DOCKERHUB_TOKEN`: Your DockerHub access token
   - `CLIENT_ENV_B64`: Base64 encoded client .env file

3. **Encode environment files**
   ```bash
   # Encode client .env
   base64 -w 0 ./client/.env > client_env.txt
   # Copy content and add as CLIENT_ENV_B64 secret
   ```

4. **Push to main branch**
   ```bash
   git push origin main
   ```
   This automatically triggers the CI/CD workflow.

### Manual Deployment

1. **Pull images from DockerHub**
   ```bash
   docker pull your-username/techcd-client:latest
   docker pull your-username/techcd-server:latest
   ```

2. **Run with Docker Compose**
   ```bash
   DOCKERHUB_USERNAME=your-username docker-compose up -d
   ```

## Useful Commands

```bash
# View running containers
docker-compose ps

# Restart a service
docker-compose restart client
docker-compose restart server

# View service logs
docker-compose logs -f client
docker-compose logs -f server

# Rebuild specific service
docker-compose up -d --build client

# Stop and remove containers, networks
docker-compose down

# Remove volumes as well
docker-compose down -v

# Clean up Docker system
docker system prune -af
```

## Troubleshooting

### Port already in use
```bash
# Find process using port
sudo lsof -i :3000
sudo lsof -i :8080

# Kill process
kill -9 <PID>
```

### Permission denied
```bash
# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

### Container won't start
```bash
# Check logs
docker-compose logs service-name

# Inspect container
docker inspect container-name
```
