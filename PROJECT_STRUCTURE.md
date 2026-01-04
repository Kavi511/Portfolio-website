# Project Structure

Complete overview of the portfolio website project structure.

## 📂 Directory Tree

```
portfolio-website/
├── frontend/                    # React + TypeScript frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── About.tsx
│   │   │   ├── Admin.tsx
│   │   │   ├── BackgroundParticles.tsx
│   │   │   ├── Certifications.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── PrivacyModal.tsx
│   │   │   ├── ProfessionalSummary.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── TerminalTypingText.tsx
│   │   │   ├── TermsModal.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── TypingText.tsx
│   │   ├── contexts/            # React contexts
│   │   │   ├── SiteDataContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── types/              # TypeScript type definitions
│   │   │   └── index.ts
│   │   ├── constants/          # Constants and configuration
│   │   │   └── index.tsx
│   │   ├── utils/              # Utility functions
│   │   ├── services/           # API service functions
│   │   ├── App.tsx              # Main application component
│   │   ├── main.tsx             # Application entry point
│   │   └── index.css           # Global styles
│   ├── public/                 # Static assets
│   │   ├── *.jpg
│   │   ├── *.png
│   │   └── *.svg
│   ├── index.html              # HTML template
│   ├── package.json            # Frontend dependencies
│   ├── vite.config.ts          # Vite configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── tsconfig.node.json      # TypeScript config for Node
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── postcss.config.js       # PostCSS configuration
│   ├── .env.example            # Environment variables template
│   └── README.md               # Frontend documentation
│
├── backend/                    # Node.js + Express backend
│   ├── config/
│   │   └── database.js         # MongoDB connection
│   ├── models/                 # MongoDB models
│   │   ├── User.js
│   │   ├── PersonalInfo.js
│   │   ├── ProfessionalSummary.js
│   │   ├── Experience.js
│   │   ├── SkillCategory.js
│   │   ├── Project.js
│   │   ├── Certification.js
│   │   └── ContactMessage.js
│   ├── routes/                 # API routes
│   │   ├── auth.js             # Authentication routes
│   │   ├── siteData.js          # Portfolio data routes
│   │   ├── contact.js           # Contact form routes
│   │   └── upload.js            # File upload routes
│   ├── middleware/             # Express middleware
│   │   ├── auth.js             # JWT authentication
│   │   └── upload.js           # File upload handling
│   ├── scripts/                # Utility scripts
│   │   ├── seedDatabase.js     # Database seeding
│   │   └── testConnection.js   # Connection testing
│   ├── uploads/                # Uploaded files
│   ├── server.js               # Application entry point
│   ├── package.json            # Backend dependencies
│   ├── .env                    # Environment variables (not in git)
│   ├── ENV_TEMPLATE.txt        # Environment template
│   ├── .gitignore              # Backend gitignore
│   └── README.md               # Backend documentation
│
├── docs/                       # Documentation
│   ├── DEVELOPMENT.md          # Development guide
│   ├── DEPLOYMENT.md           # Deployment guide
│   └── MIGRATION.md            # Migration guide
│
├── .gitignore                  # Root gitignore
├── .editorconfig               # Editor configuration
├── .prettierrc                 # Prettier configuration
├── .prettierignore             # Prettier ignore
├── package.json                # Root workspace config
└── README.md                   # Project documentation
```

## 🎯 Key Directories

### Frontend (`/frontend`)

- **`src/components/`** - All React components
- **`src/contexts/`** - React Context providers
- **`src/types/`** - TypeScript type definitions
- **`src/constants/`** - Application constants
- **`src/utils/`** - Utility functions
- **`src/services/`** - API service functions
- **`public/`** - Static assets served directly

### Backend (`/backend`)

- **`config/`** - Configuration files
- **`models/`** - MongoDB Mongoose models
- **`routes/`** - Express route handlers
- **`middleware/`** - Express middleware
- **`scripts/`** - Utility and setup scripts
- **`uploads/`** - User-uploaded files

### Documentation (`/docs`)

- Development workflows
- Deployment instructions
- Migration guides


## 📝 File Naming Conventions

- **Components:** `PascalCase.tsx` (e.g., `Navbar.tsx`)
- **Utilities:** `camelCase.ts` (e.g., `formatDate.ts`)
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`)
- **Config files:** `kebab-case` (e.g., `vite.config.ts`)

## 🔗 Import Paths

### Frontend

Use the `@/` alias for imports from `src/`:

```typescript
import Component from "@/components/Component";
import { useTheme } from "@/contexts/ThemeContext";
import { API_BASE_URL } from "@/constants";
```

### Backend

Use relative paths:

```javascript
import User from "../models/User.js";
import { authenticateToken } from "../middleware/auth.js";
```

## 🚀 Entry Points

- **Frontend:** `frontend/src/main.tsx`
- **Backend:** `backend/server.js`

## 📦 Build Outputs

- **Frontend:** `frontend/dist/`
- **Backend:** No build step (runs directly with Node.js)

## 🔒 Environment Files

- **Frontend:** `frontend/.env` (use `frontend/.env.example` as template)
- **Backend:** `backend/.env` (use `backend/ENV_TEMPLATE.txt` as template)

Both `.env` files are in `.gitignore` and should not be committed.

