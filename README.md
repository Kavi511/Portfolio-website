# Portfolio Website

A modern, full-stack portfolio website built with React, TypeScript, Node.js, Express, and MongoDB Atlas. Features a beautiful, responsive frontend with dark/light theme support and a robust RESTful API backend with admin panel for content management.

## ✨ Features

### Frontend Features
- 🎨 **Modern UI/UX** - Beautiful, responsive design with glassmorphism effects
- 🌓 **Dark/Light Theme** - System-aware theme switching with smooth transitions
- 📱 **Fully Responsive** - Optimized for all device sizes
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 🔐 **Admin Portal** - Secure admin panel for content management
- 📝 **Contact Form** - Functional contact form with validation
- 🎯 **SEO Optimized** - Meta tags and semantic HTML
- ⚡ **Fast Performance** - Optimized with Vite and code splitting

### Backend Features
- 🔒 **JWT Authentication** - Secure admin authentication
- 📊 **RESTful API** - Well-structured API endpoints
- 🗄️ **MongoDB Atlas** - Cloud database integration
- 📤 **File Upload** - CV/resume upload support
- ✅ **Input Validation** - Request validation with express-validator
- 🛡️ **Security** - CORS, password hashing, secure headers
- 📧 **Contact Management** - Contact form submissions with admin dashboard

## 🏗️ Project Structure

```
portfolio-website/
├── frontend/                    # React + TypeScript frontend
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── About.tsx
│   │   │   ├── Admin.tsx        # Admin content management panel
│   │   │   ├── BackgroundParticles.tsx
│   │   │   ├── Certifications.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Skills.tsx
│   │   │   └── ...
│   │   ├── contexts/            # React Context providers
│   │   │   ├── SiteDataContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── types/              # TypeScript type definitions
│   │   ├── constants/           # Application constants
│   │   ├── services/            # API service functions
│   │   ├── utils/              # Utility functions
│   │   ├── App.tsx             # Main application component
│   │   └── main.tsx            # Application entry point
│   ├── public/                 # Static assets
│   ├── index.html
│   └── package.json
│
├── backend/                     # Node.js + Express backend
│   ├── config/
│   │   └── database.js         # MongoDB connection
│   ├── models/                 # MongoDB Mongoose models
│   │   ├── User.js
│   │   ├── PersonalInfo.js
│   │   ├── ProfessionalSummary.js
│   │   ├── Experience.js
│   │   ├── SkillCategory.js
│   │   ├── Project.js
│   │   ├── Certification.js
│   │   └── ContactMessage.js
│   ├── routes/                 # API route handlers
│   │   ├── auth.js             # Authentication routes
│   │   ├── siteData.js         # Portfolio data CRUD
│   │   ├── contact.js           # Contact form routes
│   │   └── upload.js            # File upload routes
│   ├── middleware/             # Express middleware
│   │   ├── auth.js             # JWT authentication
│   │   └── upload.js           # File upload handling
│   ├── scripts/                # Utility scripts
│   │   ├── seedDatabase.js     # Database seeding
│   │   └── testConnection.js   # Connection testing
│   ├── uploads/                # Uploaded files directory
│   ├── server.js               # Application entry point
│   └── package.json
│
└── docs/                       # Documentation
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MongoDB Atlas** account (or local MongoDB instance)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables:**
   
   **Backend:**
   ```bash
   cd backend
   cp ENV_TEMPLATE.txt .env
   # Edit .env with your MongoDB connection string and settings
   ```
   
   **Frontend:**
   ```bash
   cd frontend
   cp .env.example .env
   # Edit .env with your API URL
   ```

4. **Seed the database (optional but recommended):**
   ```bash
   cd backend
   npm run seed
   ```
   This creates an admin user and populates initial portfolio data.

5. **Start development servers:**
   ```bash
   # From root directory - starts both frontend and backend
   npm run dev

   # Or start individually:
   npm run dev:frontend  # Frontend on http://localhost:5173
   npm run dev:backend   # Backend on http://localhost:5000
   ```

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **express-validator** - Input validation

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token

### Site Data (Public)
- `GET /api/site-data` - Get all portfolio data
- `GET /api/site-data/personal-info` - Get personal information
- `GET /api/site-data/professional-summary` - Get professional summary
- `GET /api/site-data/experiences` - Get all experiences
- `GET /api/site-data/skill-categories` - Get all skill categories
- `GET /api/site-data/projects` - Get all projects
- `GET /api/site-data/certifications` - Get all certifications

### Site Data (Admin - Requires Authentication)
- `PUT /api/site-data/personal-info` - Update personal info
- `PUT /api/site-data/professional-summary` - Update professional summary
- `POST /api/site-data/experiences` - Create experience
- `PUT /api/site-data/experiences/:id` - Update experience
- `DELETE /api/site-data/experiences/:id` - Delete experience
- Similar CRUD operations for projects, certifications, and skill categories

### Contact
- `POST /api/contact` - Submit contact form (public)
- `GET /api/contact` - Get all messages (admin)
- `GET /api/contact/:id` - Get single message (admin)
- `PATCH /api/contact/:id/read` - Mark as read (admin)
- `PATCH /api/contact/:id/replied` - Mark as replied (admin)
- `DELETE /api/contact/:id` - Delete message (admin)

### File Upload
- `POST /api/upload/cv` - Upload CV file (admin)
- `GET /api/upload/:filename` - Serve uploaded file

### Health Check
- `GET /api/health` - Server health check

## 🌐 Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# JWT Secret (Generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Admin Credentials (Change these in production!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# File Upload Configuration
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

### Frontend (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Environment
VITE_NODE_ENV=development
```

## 🛠️ Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run install:all` - Install dependencies for all workspaces
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend
- `npm run build:frontend` - Build only frontend
- `npm run build:backend` - Build only backend

### Frontend
- `npm run dev` - Start Vite dev server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Type check without emitting files
- `npm run clean` - Clean build artifacts

### Backend
- `npm run dev` - Start development server with watch mode
- `npm start` - Start production server
- `npm run seed` - Seed database with initial data
- `npm run test-connection` - Test MongoDB connection
- `npm run lint` - Run linter
- `npm run clean` - Clean build artifacts

## 📚 Database Models

### User
- Admin user for authentication
- Username and hashed password
- Role-based access

### PersonalInfo
- Personal information (name, email, phone, social links, etc.)
- Singleton model (only one document)

### ProfessionalSummary
- Professional summary with highlights
- Singleton model

### Experience
- Work experience entries
- Role, company, period, description

### SkillCategory
- Skill categories with skills array
- Ordering support

### Project
- Portfolio projects
- Title, description, tech stack, GitHub URL, images

### Certification
- Professional certifications
- Issuer, dates, credential URLs

### ContactMessage
- Contact form submissions
- Name, email, subject, message
- Read/replied status tracking

## 🔐 Authentication

The admin panel uses JWT (JSON Web Tokens) for authentication:

1. **Login:** `POST /api/auth/login` with username and password
2. **Receive:** JWT token in response
3. **Use:** Include token in `Authorization: Bearer <token>` header for protected routes
4. **Expiry:** Tokens expire after 24 hours (configurable)

## 🎨 Admin Panel

Access the admin panel by:
1. Navigate to the website
2. Click the admin button (usually in navbar)
3. Login with admin credentials
4. Manage all portfolio content:
   - Personal information
   - Professional summary
   - Work experiences
   - Skills and categories
   - Projects
   - Certifications

## 🧪 Testing

```bash
# Test MongoDB connection
cd backend
npm run test-connection

# Type checking (frontend)
cd frontend
npm run type-check

# Linting
npm run lint
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify `MONGODB_URI` in `.env` is correct
- Check MongoDB Atlas IP whitelist includes your IP
- Ensure database user credentials are correct
- Test connection: `npm run test-connection` (in backend)

### Port Already in Use
- Change `PORT` in backend `.env`
- Change port in `frontend/vite.config.ts`

### Module Not Found Errors
- Run `npm install` in the affected workspace
- Check import paths use `@/` alias (frontend)
- Verify TypeScript path mapping in `tsconfig.json`

### Authentication Issues
- Verify `JWT_SECRET` is set correctly
- Check token hasn't expired (24 hours default)
- Ensure `Authorization: Bearer <token>` header format is correct

### CORS Errors
- Verify `FRONTEND_URL` in backend `.env` matches frontend URL
- Check CORS configuration in `backend/server.js`

## 🚢 Deployment

### Recommended Platforms

**Frontend:**
- Vercel (recommended)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

**Backend:**
- Railway
- Render
- Heroku
- AWS EC2/Elastic Beanstalk
- Google Cloud Run

### Deployment Steps

1. **Build frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Set production environment variables:**
   - Use strong `JWT_SECRET`
   - Update `MONGODB_URI` to production database
   - Change admin credentials
   - Set `NODE_ENV=production`
   - Update `FRONTEND_URL` to production domain

3. **Deploy backend:**
   - Push to your hosting platform
   - Configure environment variables
   - Start the server

4. **Deploy frontend:**
   - Upload `dist/` folder or connect repository
   - Set `VITE_API_URL` to your backend API URL

## 📝 Code Style

- **TypeScript** - Strict mode enabled
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **EditorConfig** - Consistent editor settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

ISC

## 👤 Author

**Kavishka Herath**

- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn]
- GitHub: [@Kavi511](https://github.com/Kavi511)
- Email: kavishkacherath@gmail.com

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the blazing-fast build tool
- MongoDB Atlas for cloud database hosting
- All open-source contributors

## 📞 Support

For support, email kavishkacherath@gmail.com or open an issue in the repository.

---

**Built with ❤️ using React, TypeScript, Node.js, and MongoDB**
