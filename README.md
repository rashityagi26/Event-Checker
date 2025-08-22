# Event App

Full-stack event check-in app with a Node/Express + Apollo GraphQL backend (Prisma + SQLite) and an Expo React Native frontend.

## Prerequisites
- Node.js 18+
- npm 9+
- Git (optional)

## Project Structure
- `backend/` – Express, Apollo Server, Prisma (SQLite)
- `frontend/` – Expo (React Native Web/Android/iOS)

## 1) Setup
Install dependencies for both apps:

```powershell
cd backend
npm install
cd ../frontend
npm install
```

## 2) Database
Generate client, push schema, and seed data:

```powershell
cd backend
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts
```

You can inspect data with:
```powershell
npm run db:studio
```

## 3) Run Backend
Starts dev server on port 4000.

```powershell
cd backend
npm run dev
```

Health check:
```powershell
curl.exe http://localhost:4000/health
```

GraphQL endpoint:
```
http://localhost:4000/graphql
```

## 4) Run Frontend (Web)
Set API URL, then start Expo for web.

```powershell
cd frontend
$env:EXPO_PUBLIC_API_URL="http://localhost:4000/graphql"
$env:CI="1"   # non-interactive; remove to enable watch reloads
npx expo start --web
```

Open the URL printed by Expo (e.g., `http://localhost:19006`).

If you see a port conflict for Metro (8081), start Metro on a different port:

```powershell
cd frontend
$env:EXPO_PUBLIC_API_URL="http://localhost:4000/graphql"
$env:RCT_METRO_PORT="8082"
$env:CI="1"
npx expo start --web
```

### Using a phone on the same Wi‑Fi
`localhost` won’t work on phones. Use your PC’s LAN IP (example: `192.168.1.4`).

```powershell
cd frontend
$env:EXPO_PUBLIC_API_URL="http://192.168.1.4:4000/graphql"
npx expo start --android --lan
```

## 5) Environment Variables
Frontend reads the GraphQL endpoint from `EXPO_PUBLIC_API_URL`.
- Example: `http://localhost:4000/graphql`
- For devices: `http://<your-lan-ip>:4000/graphql`

Backend uses `.env` (optional) for `PORT` etc. Default port is `4000`.

## 6) App Flows
- Login screen provides demo users (email/password listed on screen)
- Event list displays events from GraphQL
- Event detail allows selecting an attendee and joining (demo)

## Troubleshooting

### ERR_CONNECTION_REFUSED (frontend)
- Ensure backend is running and healthy:
  ```powershell
  curl.exe http://localhost:4000/health
  ```
- Verify frontend API URL is correct and ends with `/graphql`:
  ```powershell
  cd frontend
  $env:EXPO_PUBLIC_API_URL
  ```
- Phones must use LAN IP instead of `localhost`.
- If Metro 8081 is busy, set `RCT_METRO_PORT` (see above) and retry.
- Some browsers/extensions/proxies can block localhost; try another browser.

### Expo prompts to install packages
When prompted `Ok to proceed? (y)`, answer `y`.

### Firewall/Ports
Allow Node.js (node.exe) through Windows Firewall (Private). Ensure these ports are open:
- Backend: 4000
- Expo: 19000–19006, 8081

### Quick Start (copy/paste)

Backend (in one terminal):
```powershell
cd backend
npm run dev
```

Frontend Web (in another terminal):
```powershell
cd frontend
$env:EXPO_PUBLIC_API_URL="http://localhost:4000/graphql"; $env:RCT_METRO_PORT="8082"; $env:CI="1"; npx expo start --web
```

### Prisma version warnings
You may see upgrade hints. The app works with the pinned versions; upgrade later if needed.

## Scripts Reference
Backend (`backend/package.json`):
- `npm run dev` – start dev server
- `npm run build` – build TypeScript
- `npm run start` – run built server
- `npm run db:generate` – prisma generate
- `npm run db:push` – prisma db push
- `npm run db:seed` – seed database
- `npm run db:studio` – open Prisma Studio

Frontend (`frontend/package.json`):
- `npm run start` – Expo start (interactive)
- `npm run web` – Expo web
- `npm run android` – Expo Android
- `npm run ios` – Expo iOS (macOS only)

## Notes
- This repo uses SQLite (`backend/prisma/dev.db`) for quick local setup.
- Hot reload is available; with `$env:CI="1"` watch mode is disabled for non-interactive runs.

