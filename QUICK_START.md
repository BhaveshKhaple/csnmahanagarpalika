# Quick Start Guide

Get the Smart Municipal Citizen Portal running in 5 minutes!

## Prerequisites

- Node.js 20+ installed
- Firebase account
- Git

## Step 1: Clone Repository

```bash
git clone https://github.com/your-org/smart-municipal-portal.git
cd smart-municipal-portal
```

## Step 2: Install Dependencies

```bash
npm install

# Install Firebase CLI globally
npm install -g firebase-tools
```

## Step 3: Firebase Setup

### Option A: Use Firebase Emulator (Recommended for Development)

```bash
# Copy environment file
cp .env.example .env.local

# Start Firebase emulators
firebase emulators:start
```

### Option B: Connect to Real Firebase Project

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)

2. Enable services:
   - Authentication (Email/Password, Phone)
   - Firestore Database
   - Cloud Storage
   - Cloud Functions

3. Get your Firebase config and update `.env.local`:

```bash
cp .env.example .env.local
# Edit .env.local with your Firebase configuration
```

## Step 4: Start Development Server

```bash
# In one terminal: Start Firebase emulators (if using emulator)
firebase emulators:start

# In another terminal: Start Next.js
npm run dev
```

## Step 5: Access Application

- **Application**: http://localhost:3000
- **Firebase Emulator UI**: http://localhost:4000 (if using emulator)

## Default Test Accounts (Emulator Only)

### Citizen Account
- Email: `citizen@test.com`
- Password: `Test@123`

### Officer Account
- Email: `officer@test.com`
- Password: `Test@123`

### Admin Account
- Email: `admin@test.com`
- Password: `Test@123`

## Project Structure

```
smart-municipal-portal/
├── src/
│   ├── app/              # Next.js pages and API routes
│   ├── components/       # React components
│   ├── lib/             # Core libraries (Firebase config)
│   ├── hooks/           # Custom React hooks
│   └── types/           # TypeScript types
├── firebase/
│   ├── functions/       # Cloud Functions
│   ├── firestore.rules  # Database security rules
│   └── storage.rules    # Storage security rules
├── public/              # Static assets
└── docs/                # Documentation
```

## Common Commands

```bash
# Development
npm run dev              # Start Next.js dev server
npm run build            # Build for production
npm run start            # Start production server

# Firebase
firebase emulators:start # Start Firebase emulators
firebase deploy          # Deploy to Firebase
firebase login           # Login to Firebase

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run type-check       # TypeScript type checking

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

## Key Features to Test

### 1. User Registration & Login
- Navigate to `/login`
- Create a new account or use test credentials

### 2. Citizen Dashboard
- View dashboard at `/citizen/dashboard`
- Quick access to all services

### 3. File a Complaint
- Go to `/citizen/complaints/new`
- Add location, images, description
- Track status in real-time

### 4. Property Tax Payment
- Visit `/citizen/property-tax`
- View tax details and pay online

### 5. Apply for Certificates
- Navigate to `/citizen/certificates`
- Choose certificate type (Birth/Death/Marriage)
- Fill form and upload documents

### 6. AI Chatbot
- Click on chatbot icon (bottom-right)
- Ask questions in natural language
- Get instant responses

### 7. Admin Dashboard (Admin Role Required)
- Access `/admin/dashboard`
- View analytics and metrics
- Manage users and departments

### 8. GIS Map View
- Go to `/admin/gis-map`
- View complaint heatmaps
- Interactive ward boundaries

## Development Tips

### Hot Reload
Changes to code will automatically reload the page.

### Firebase Emulator Data
Emulator data is cleared when stopped. Use seed scripts to populate test data.

### Environment Variables
Never commit `.env.local` to version control. Keep sensitive data secure.

### Component Development
Components are in `src/components/` - organized by feature.

### API Routes
API endpoints are in `src/app/api/` - follow Next.js App Router conventions.

### Firebase Functions
Cloud Functions are in `firebase/functions/src/` - TypeScript based.

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

### Firebase Emulator Issues
```bash
# Clear emulator data
firebase emulators:exec --only firestore "echo 'Cleared'"

# Restart emulators
firebase emulators:start --import=./firebase-data
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. ✅ Explore the application features
2. ✅ Read the [API Documentation](./docs/API.md)
3. ✅ Check [Architecture Guide](./docs/ARCHITECTURE.md)
4. ✅ Review [Firebase Setup](./docs/FIREBASE_SETUP.md)
5. ✅ Follow [Contributing Guidelines](./CONTRIBUTING.md)

## Getting Help

- 📖 **Documentation**: Check `/docs` folder
- 🐛 **Issues**: Report bugs on GitHub Issues
- 💬 **Discussions**: Ask questions on GitHub Discussions
- 📧 **Email**: support@smartmunicipal.com

## Production Deployment

When ready to deploy:

```bash
# Build the application
npm run build
npm run export

# Deploy to Firebase
firebase deploy

# Or deploy specific services
firebase deploy --only hosting
firebase deploy --only functions
```

---

**Happy Coding! 🚀**

Start building the future of e-governance with this modern, AI-powered municipal portal.
