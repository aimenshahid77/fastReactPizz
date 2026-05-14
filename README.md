# 🍕 Fast React Pizza Co.

A fast, modern pizza ordering web application built with React. Browse the menu, customize your order, and get your pizza delivered — no account required.

**🔗 Live Demo:** [fast-react-pizz-pink.vercel.app](https://fast-react-pizz-pink.vercel.app/)

---

## ✨ Features

- 🛒 **Dynamic Menu** — Fetches real-time pizza data from an external API
- 👤 **No Sign-up Required** — Just enter your name and start ordering
- 📦 **Cart Management** — Add, remove, and update quantities with ease
- 📍 **GPS Location Support** — Auto-fill your delivery address using geolocation
- ⚡ **Priority Orders** — Mark your order as priority for faster delivery
- 🔍 **Order Tracking** — Look up any order using its unique order ID
- 📱 **Fully Responsive** — Optimized for mobile and desktop

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend Framework | [React](https://react.dev/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| State Management | [Redux Toolkit](https://redux-toolkit.js.org/) |
| Server State & Caching | [React Query (TanStack Query)](https://tanstack.com/query) |
| Schema Validation | [Zod](https://zod.dev/) |
| Backend & Database | [Supabase](https://supabase.com/) |
| Routing | [React Router v6](https://reactrouter.com/) |
| API Fetching | Native `fetch` API with custom loaders/actions |
| Build Tool | [Vite](https://vitejs.dev/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn
- A [Supabase](https://supabase.com/) account and project

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/your-username/fast-react-pizza.git
   cd fast-react-pizza
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Start the development server**
```bash
   npm run dev
```

   The app will be available at `http://localhost:5173`

---

## 📁 Project Structure
