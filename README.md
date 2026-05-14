# 🍕 Fast React Pizza

A fast, modern pizza ordering web application built with React. Browse the menu, customize your order, and get your pizza delivered — no account required.

**🔗 Live Demo:** [fast-react-pizz-pink.vercel.app](https://fast-react-pizz-pink.vercel.app/)

---

##  Features

- 🛒 **Dynamic Menu** — Fetches real-time pizza data from an external API
- 👤 **No Sign-up Required** — Just enter your name and start ordering
- 📦 **Cart Management** — Add, remove, and update quantities with ease
- 📍 **GPS Location Support** — Auto-fill your delivery address using geolocation
- ⚡ **Priority Orders** — Mark your order as priority for faster delivery
- 🔍 **Order Tracking** — Look up any order using its unique order ID
- 📱 **Fully Responsive** — Optimized for mobile and desktop

---

## Tech Stack

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

##  Getting Started

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
fast-react-pizza/
├── src/
│   ├── components/
│   │   ├── Cart/
│   │   │   ├── Cart.jsx
│   │   │   └── CartOverview.jsx
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   ├── Menu/
│   │   │   ├── Menu.jsx
│   │   │   └── MenuItem.jsx
│   │   ├── Order/
│   │   │   ├── OrderConfirmation.jsx
│   │   │   └── OrderPage.jsx
│   │   └── SharedUi/
│   │       └── Buttons/
│   │           ├── Buttons.jsx
│   │           └── CartButtons.jsx
│   ├── helpers/           # Utility/helper functions
│   ├── layout/            # App layout (header, footer, etc.)
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── cartSlice.js
│   │   │   └── userSlice.js
│   │   └── store.js
│   ├── services/
│   │   ├── Api.js         # Menu & order API calls
│   │   └── Geolocation.js # GPS / address fetching
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js

---

##  Architecture & Key Decisions

### State Management
- **Redux Toolkit** handles global client state: the cart contents and the current user's name.
- **React Query** manages all server state: fetching the menu, creating orders, and re-fetching on demand — with built-in caching and loading states.

### Data Fetching
- Menu data and order details are loaded via **React Router loaders**, enabling data to be fetched before the component renders.
- Order creation and updates use **React Router actions**, keeping mutation logic co-located with the route.

### Validation
- **Zod** is used to validate order form data (phone number format, required fields) before submission, providing clear user-facing error messages.

### Styling
- **Tailwind CSS** utility classes are used throughout for a consistent, mobile-first design with zero custom CSS files.

---

##  Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

##  API

This app uses the [Jonas Schmedtmann](https://github.com/jonasschmedtmann) Pizza API for menu and order data:

- `GET /menu` — Fetch all available pizzas
- `GET /order/:id` — Get order by ID
- `POST /order` — Create a new order
- `PATCH /order/:id` — Update order (e.g., mark as priority)

---

##  Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the project
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with using React, Tailwind CSS, and Supabase.
