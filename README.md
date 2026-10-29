# MindBridge (frontend demo)

A student wellness and study companion with a dark neon theme.

This is a **frontend demo**. It is not a clinic, not a diagnosis tool, and not secure cloud authentication. Your data stays in this browser.

## How to run

1. Install Node.js (version 18 or newer).
2. Open a terminal in this folder.
3. Install packages once:

```bash
npm install
```

4. Start the site:

```bash
npm run dev
```

5. Open the URL it prints, usually `http://localhost:5173/`.

Create an account on **Sign Up**. The username you choose appears across the app. There is no hardcoded “Riya” user.

## What is stored where

Tasks, moods, journal notes, exams, goals, reminders and focus sessions are saved in `localStorage` under your demo username.

- Passwords are hashed in the browser. That is still **not** real security.
- Journal notes are **not** encrypted private storage.

## Scripts

- `npm run dev` — local site
- `npm run build` — production build
- `npm run preview` — preview the production build
