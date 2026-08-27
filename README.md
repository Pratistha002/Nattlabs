# NATTLABS Website

Professional light educational website for [nattlabs.com](https://www.nattlabs.com/) — React frontend, Spring Boot API, MongoDB.

## Structure

```
Nattlabs/
  frontend/   # Vite + React + TypeScript (port 5173)
  backend/    # Spring Boot 3.2 + MongoDB (port 8080)
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

If Node is not on PATH, use the portable Node at `Nattlabs/.tools/node`.

The UI works with content fallbacks even when the API is offline.

## Backend

Requires **Java 21** and **MongoDB** on `localhost:27017`.

Contact form submissions are emailed to **support@nattlabs.com** when SMTP is configured (see `backend/.env.example`).

```bash
cd backend
.\gradlew.bat bootRun
```

## Design notes / recommended upgrades

Current site keeps **exact NATTLABS copy** and existing images. To make it look even more educational/premium, consider sharing:

1. **Hero photo** — bright campus/lab classroom photo (students + mentors), not abstract tech textures  
2. **Consistent learner portraits** — same crop/lighting/background for all success stories  
3. **Campus / office photos** — HSR Layout center interiors for About  
4. **Partner logo files** — official Siemens logo (and others only if approved)  
5. **Program brochure PDF** — for a “Download brochure” CTA  
6. **Optional illustration set** — soft flat icons for Learn / Profile / Train / Deploy  

Avoid dark cyber / neon backgrounds for this brand if the goal is an education institute look.
