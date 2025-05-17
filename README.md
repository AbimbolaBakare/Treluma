# 🌆 Treluma

[![Vercel](https://vercelbadge.vercel.app/api/abimbolabakare/treluma)](https://treluma.vercel.app)

Treluma helps travelers explore the emotional and cultural energy of cities around the world. Powered by OpenAI and Unsplash, it provides:

- 🎨 Vibe-based city summaries
- 🌈 Color palettes matching each city's energy
- 🖼️ Curated moodboards

## ✨ Features

- Intelligent autocomplete with Google Places API
- Structured city summaries using OpenAI GPT-4o
- Color palettes tied to energy (calm, vibrant, chaotic, etc.)
- Real-time moodboards sourced from Unsplash
- Fully responsive, theme-aware (light/dark mode)
- Input caching and rate-limiting to reduce API costs

---

## 🧱 Tech Stack

- **Framework**: Next.js 15+ App Router
- **Language**: TypeScript
- **AI**: OpenAI GPT-4o (structured responses via Zod)
- **Autocomplete**: Google Maps Places Autocomplete API (via proxy)
- **Images**: Unsplash API
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide

---

## 🔐 API Keys & Environment Variables

Add a `.env.local` file with:

```env
OPENAI_API_KEY=your-openai-api-key
UNSPLASH_ACCESS_KEY=your-unsplash-access-key
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

Ensure that:
- Google Maps API key allows `Places API`, and has referrer/IP restrictions
- Unsplash and OpenAI keys are active and within quota

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```

Runs on: `http://localhost:3000`

---

## 🧠 Notable Engineering Decisions

- **Autocomplete proxy**: Google Places is called from a custom proxy route to support server-side API keys and rate limiting.
- **Abortable search**: Uses `AbortController` to cancel stale requests while typing
- **Fetch suppression**: Uses `useRef` flag to prevent unnecessary API calls when selecting suggestions
- **Structured OpenAI output**: Uses `zodTextFormat()` to validate GPT response and enforce shape
- **In-memory caching**: `cacheWithTTL()` wraps fetches and reduces OpenAI token usage

---

## 🧪 Future Improvements

- 🌍 Auto-language translation support via OpenAI
- 🧳 Export or share results as PDF/download
- 🌤️ Integrate OpenWeatherMap for weather insights
- ✈️ Use Skyscanner API to show flight options to the selected city
- 🧠 AI-powered itinerary suggestions
- 🗂️ Save and revisit previously searched cities using local storage
- 🖼️ Pagination or infinite scroll for moodboard images
- 💾 Replace in-memory caching with Redis or Vercel KV for persistence

---

## 💡 Inspiration

Treluma is for travelers who want more than tourist checklists. It's about finding the **feel** of a city before you arrive.

> “Don’t just go where it’s popular, go where it feels right.”
