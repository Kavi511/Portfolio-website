# Portfolio Frontend

Modern React frontend for the portfolio website built with TypeScript, Vite, and Tailwind CSS.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/      # React components
│   ├── contexts/        # React contexts (Theme, SiteData)
│   ├── types/           # TypeScript type definitions
│   ├── constants/       # Constants and configuration
│   ├── utils/           # Utility functions
│   ├── services/        # API service functions
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
├── index.html           # HTML template
└── vite.config.ts       # Vite configuration
```

## 🛠️ Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📝 Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🎨 Features

- Dark/Light theme support
- Responsive design
- Smooth animations
- Admin portal for content management
- Contact form
- Project showcase
- Skills and certifications display

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Type check without emitting files

