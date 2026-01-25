# Tiny URL

A modern URL shortening service built with TypeScript, Express, and PostgreSQL, containerized with Docker for easy deployment.

[//]: # (## Project Structure)


## Features

- 🔗 URL shortening service
- 📊 Analytics tracking
- 🛡️ Security with Helmet and rate limiting
- 🐳 Docker containerization
- 🌐 Nginx reverse proxy
- 🧪 API testing with Bruno

## Tech Stack

### Backend
- **Node.js** with **TypeScript**
- **Express.js** framework
- **PostgreSQL** database with **Prisma ORM**
- **Helmet** for security headers
- **Express-rate-limit** for rate limiting
- **Morgan** for request logging

### Frontend
- [Your frontend framework - please specify]

### Infrastructure
- **Docker** containerization
- **Nginx** reverse proxy and load balancing
- **docker-compose** for multi-container orchestration

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (v18+) for local development
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tiny-url
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` files in respective directories and configure your environment variables.

### Running with Docker (Recommended)

```bash
# Build and start production services
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

[//]: # (### Local Development)

[//]: # ()
[//]: # (```bash)

[//]: # (# Install dependencies)

[//]: # (npm install)

[//]: # ()
[//]: # (# Run backend server)

[//]: # (npm run dev:server)

[//]: # ()
[//]: # (# Run frontend client)

[//]: # (npm run dev:client)

[//]: # (```)
