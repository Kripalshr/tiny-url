<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx"/>
</p>

<h1 align="center">🔗 Tiny URL</h1>

<p align="center">
  <strong>A scalable URL shortening service with load balancing and analytics</strong>
</p>

<p align="center">
  Built with TypeScript, Express, PostgreSQL, and containerized with Docker for production-ready deployment.
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔗 **URL Shortening** | Convert long URLs to short, memorable links using Base62 encoding |
| 🔄 **Fast Redirects** | Instant redirection with 302 HTTP responses |
| 📊 **Click Analytics** | Track click counts in real-time |
| ⏰ **Expiration Support** | Set optional expiration dates for URLs |
| ⚖️ **Load Balancing** | Nginx distributes traffic across 3 server instances |
| 🛡️ **Security** | Helmet.js headers + rate limiting protection |
| 🐳 **Docker Ready** | One command to deploy the entire stack |

---

## 🏗️ Architecture

```
                              ┌─────────────────┐
                              │     Clients     │
                              │  (Browser/API)  │
                              └────────┬────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │      Nginx      │
                              │  Load Balancer  │
                              │    (Port 80)    │
                              └────────┬────────┘
                                       │
              ┌────────────────────────┼────────────────────────┐
              ▼                        ▼                        ▼
     ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
     │    Server 1     │      │    Server 2     │      │    Server 3     │
     │   (Port 3000)   │      │   (Port 3000)   │      │   (Port 3000)   │
     └────────┬────────┘      └────────┬────────┘      └────────┬────────┘
              │                        │                        │
              └────────────────────────┼────────────────────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │   PostgreSQL    │
                              │    Database     │
                              └─────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js 18+ |
| **Language** | TypeScript |
| **Framework** | Express.js |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Load Balancer** | Nginx |
| **Containerization** | Docker + Docker Compose |
| **Security** | Helmet, express-rate-limit |
| **Logging** | Morgan |
| **API Testing** | Bruno |

---

## 📁 Project Structure

```
tiny-url/
├── server/                 # Backend application
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API route definitions
│   │   ├── utils/          # Encoding/decoding helpers
│   │   ├── config/         # Prisma configuration
│   │   └── generated/      # Prisma client
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── migrations/     # Database migrations
│   └── Dockerfile
├── nginx/
│   └── nginx.conf          # Load balancer configuration
├── Bruno/                  # API test collection
├── docker-compose.yml      # Container orchestration
└── README.md
```

---

## 🔌 API Endpoints

### Create Short URL
```http
POST /api/v1/url
Content-Type: application/json

{
  "longUrl": "https://example.com/very/long/path/to/resource"
}
```

**Response:**
```json
{
  "message": "success",
  "data": {
    "id": 12345,
    "longUrl": "https://example.com/very/long/path/to/resource",
    "shortUrl": "3d7",
    "active": true,
    "expiresAt": null
  }
}
```

### Redirect
```http
GET /:shortUrlId

# Example: GET /3d7 → Redirects to original URL
```

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)

### Run with Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/tiny-url.git
cd tiny-url

# Start all services
docker-compose up -d

# Access the API at http://localhost:8080
```

### Local Development

```bash
# Install dependencies
cd server
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
npx prisma migrate dev

# Start the server
npm run dev
```

---

## 🗄️ Database Schema

```prisma
model User {
  id              Int       @id @default(autoincrement())
  firstName       String
  lastName        String
  username        String    @unique
  email           String    @unique
  isEmailVerified Boolean   @default(false)
  password        String?
  role            String
  urls            Url[]
}

model Url {
  id         Int            @id @default(autoincrement())
  userId     Int?
  longUrl    String
  shortUrl   String?        @unique
  active     Boolean        @default(true)
  expiresAt  DateTime?
  clickCount Int            @default(0)
  user       User?          @relation(fields: [userId], references: [id])
  analytics  UrlAnalytics[]
}

model UrlAnalytics {
  id        Int      @id @default(autoincrement())
  urlId     Int
  clickedAt DateTime @default(now())
  userAgent String?
  country   String?
  region    String?
  city      String?
  url       Url      @relation(fields: [urlId], references: [id])
}
```

---

## 🔧 Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/tinyurl"

# Server
PORT=3000
NODE_ENV=development
```

---

## 🗺️ Roadmap

- [ ] 🖥️ Frontend dashboard (React/Next.js)
- [ ] 🔐 User authentication (JWT + OAuth)
- [ ] 📈 Analytics dashboard with charts
- [ ] 🏷️ Custom URL aliases
- [ ] 📱 QR code generation
- [ ] 🔒 Password-protected links
- [ ] ⚡ Redis caching for hot URLs
- [ ] 🌍 Geographic analytics

---

## 📄 License

MIT License - feel free to use this project for learning or production!

---

<p align="center">
  <strong>⭐ Star this repo if you found it helpful!</strong>
</p>
