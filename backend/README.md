# Nattlabs Website Backend

Spring Boot 3.2 REST API for the [NATTLABS](https://www.nattlabs.com) marketing website. Serves testimonials, page content, and contact form submissions backed by MongoDB.

## Prerequisites

- Java 21
- MongoDB running locally on port `27017`

## Configuration

Default settings in `src/main/resources/application.yml`:

| Setting | Value |
|---------|-------|
| Server port | `8080` |
| MongoDB URI | `mongodb://localhost:27017/nattlabs` |
| CORS origins | `http://localhost:5173`, `http://127.0.0.1:5173` (and 5174) |

### Contact form email

Submissions from `POST /api/contact` are saved to MongoDB and emailed to **support@nattlabs.com**.

Set these environment variables before starting the backend (see `.env.example`):

| Variable | Purpose |
|----------|---------|
| `SPRING_MAIL_HOST` | SMTP host (e.g. `smtp-relay.brevo.com`) |
| `SPRING_MAIL_PORT` | SMTP port (usually `587`) |
| `SPRING_MAIL_USERNAME` | SMTP login |
| `SPRING_MAIL_PASSWORD` | SMTP key / app password |
| `APP_MAIL_FROM` | Verified sender address |
| `APP_CONTACT_TO` | Inbox (default: `support@nattlabs.com`) |

Example (PowerShell):

```powershell
$env:SPRING_MAIL_USERNAME="your-brevo-login"
$env:SPRING_MAIL_PASSWORD="your-smtp-key"
$env:APP_MAIL_FROM="your-verified-sender@example.com"
cd backend
.\gradlew.bat bootRun
```

If mail is not configured, the API returns an error instead of pretending the message was emailed.

## Run locally

```bash
# Windows
gradlew.bat bootRun

# macOS / Linux
./gradlew bootRun
```

On first startup, `DataSeeder` loads testimonials and page content from the live NATTLABS site into MongoDB.

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/testimonials` | List testimonials (ordered) |
| POST | `/api/contact` | Submit contact form (`name`, `email`, `message` required) |
| GET | `/api/pages` | List all page content |
| GET | `/api/pages/{slug}` | Get page by slug (`transformation`, `solution`, `services`, `industries`, `values`, `careers`, `about`) |

## Build

```bash
gradlew.bat build
```

## Contact

- Address: 1705, 19th Main Road, Sector 2, HSR Layout, Bengaluru, 560102, India
- Phone: +91 779 550 0937
- Email: support@nattlabs.com
