# Firebase Integration Setup Guide

## 📋 Overview
This document provides complete instructions for setting up Firebase integration for the Smart Municipal Citizen Portal.

---

## 🚀 Quick Start

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `smart-municipal-portal` (or your choice)
4. Enable Google Analytics (recommended)
5. Click **"Create project"**

### 2. Register Web App

1. In Firebase Console, click the **Web icon (</>) **
2. Register app nickname: `Smart Municipal Portal Web`
3. Check **"Also set up Firebase Hosting"**
4. Click **"Register app"**
5. Copy the Firebase configuration object

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase configuration from step 2:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

---

## 🔐 Authentication Setup

### Enable Authentication Methods

1. Go to **Authentication** > **Sign-in method**
2. Enable the following providers:

#### Email/Password
- Click **Email/Password**
- Toggle **Enable**
- Click **Save**

#### Google Sign-In
- Click **Google**
- Toggle **Enable**
- Add support email
- Click **Save**

#### Phone Authentication
- Click **Phone**
- Toggle **Enable**
- Add test phone numbers (optional)
- Click **Save**

### Configure Authentication Settings

1. **Authorized Domains:**
   - Go to **Authentication** > **Settings** > **Authorized domains**
   - Add your production domain (e.g., `smartmunicipal.gov.in`)
   - localhost is pre-authorized

2. **Email Templates:**
   - Go to **Authentication** > **Templates**
   - Customize email templates for:
     - Password reset
     - Email verification
     - SMS verification

---

## 🗄️ Firestore Database Setup

### 1. Create Database

1. Go to **Firestore Database**
2. Click **"Create database"**
3. Select **"Start in production mode"** (we'll add rules next)
4. Choose location: `asia-south1` (Mumbai) or nearest
5. Click **"Enable"**

### 2. Deploy Security Rules

```bash
firebase deploy --only firestore:rules
```

Or manually copy from `firestore.rules` file to Firebase Console:
- Go to **Firestore Database** > **Rules**
- Paste the rules
- Click **"Publish"**

### 3. Create Indexes

Go to **Firestore Database** > **Indexes** and create composite indexes:

#### Complaints Index
- Collection: `complaints`
- Fields:
  - `userId` (Ascending)
  - `createdAt` (Descending)
- Query scope: Collection

#### Applications Index
- Collection: `applications`
- Fields:
  - `userId` (Ascending)
  - `createdAt` (Descending)
- Query scope: Collection

#### Bills Index
- Collection: `bills`
- Fields:
  - `userId` (Ascending)
  - `dueDate` (Descending)
- Query scope: Collection

#### Notifications Index
- Collection: `notifications`
- Fields:
  - `userId` (Ascending)
  - `createdAt` (Descending)
- Query scope: Collection

### 4. Seed Initial Data (Optional)

Create initial collections and documents:

#### Settings Collection
```javascript
{
  "municipality": {
    "name": "छत्रपती संभाजीनगर महानगरपालिका",
    "nameEn": "Chhatrapati Sambhajinagar Municipal Corporation",
    "area": "437 sq km",
    "population": "1,200,000+",
    "wards": 115,
    "established": 1936,
    "website": "https://chhsambhajinagarmc.org",
    "email": "info@csmc.gov.in",
    "phone": "+91-240-2331234",
    "address": "Civil Lines, Chhatrapati Sambhajinagar, Maharashtra 431001"
  }
}
```

#### Departments Collection
```javascript
[
  {
    "id": "roads",
    "name": "रस्ते विभाग",
    "nameEn": "Roads Department",
    "email": "roads@csmc.gov.in",
    "phone": "+91-240-2331235"
  },
  {
    "id": "water",
    "name": "पाणीपुरवठा विभाग",
    "nameEn": "Water Supply Department",
    "email": "water@csmc.gov.in",
    "phone": "+91-240-2331236"
  },
  // Add more departments...
]
```

---

## 📦 Cloud Storage Setup

### 1. Enable Storage

1. Go to **Storage**
2. Click **"Get started"**
3. Select **"Start in production mode"**
4. Choose location: same as Firestore
5. Click **"Done"**

### 2. Deploy Storage Rules

```bash
firebase deploy --only storage
```

Or manually:
- Go to **Storage** > **Rules**
- Paste rules from `storage.rules`
- Click **"Publish"**

### 3. Create Folder Structure

Create these folders in Storage:
```
/users
/complaints
/applications
/properties
/public
  /news
  /officials
/temp
```

---

## 🔥 Firebase Admin SDK (Server-side)

### 1. Generate Service Account Key

1. Go to **Project Settings** > **Service accounts**
2. Click **"Generate new private key"**
3. Download the JSON file
4. **IMPORTANT:** Keep this file secure, never commit to Git

### 2. Add to Environment Variables

```env
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"
```

---

## 🎯 Collection Schemas

### Users Collection (`users`)
```typescript
{
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  role: 'citizen' | 'officer' | 'admin' | 'superadmin';
  ward?: string;
  address?: string;
  aadharNumber?: string; // Encrypted
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Complaints Collection (`complaints`)
```typescript
{
  userId: string;
  citizenName: string;
  citizenPhone: string;
  category: string;
  title: string;
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  images?: string[]; // Storage URLs
  status: 'submitted' | 'assigned' | 'in_progress' | 'resolved' | 'closed' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string; // Officer UID
  assignedDepartment?: string;
  timeline: Array<{
    status: string;
    date: Timestamp;
    description: string;
    by: string;
  }>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Applications Collection (`applications`)
```typescript
{
  userId: string;
  type: 'birth' | 'death' | 'marriage' | 'trade_license' | 'building_permit';
  applicationNumber: string;
  formData: any; // Type-specific data
  documents: { [key: string]: string }; // Document URLs
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewNotes?: string;
  fee: number;
  paymentStatus: 'pending' | 'paid';
  paymentId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Bills Collection (`bills`)
```typescript
{
  userId: string;
  type: 'property_tax' | 'water_bill';
  billNumber: string;
  propertyId?: string;
  connectionId?: string;
  amount: number;
  dueDate: Timestamp;
  status: 'pending' | 'paid' | 'overdue';
  fiscalYear: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Payments Collection (`payments`)
```typescript
{
  userId: string;
  billId: string;
  amount: number;
  method: 'online' | 'cash' | 'cheque';
  transactionId: string;
  status: 'pending' | 'success' | 'failed';
  gateway: 'razorpay' | 'paytm' | 'upi';
  receiptUrl?: string;
  createdAt: Timestamp;
}
```

### Properties Collection (`properties`)
```typescript
{
  propertyId: string;
  ownerId: string;
  ownerName: string;
  address: string;
  ward: string;
  zone: string;
  area: number; // sq ft
  propertyType: string;
  assessedValue: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Water Connections Collection (`waterConnections`)
```typescript
{
  connectionId: string;
  ownerId: string;
  ownerName: string;
  address: string;
  ward: string;
  connectionType: 'residential' | 'commercial' | 'industrial';
  meterNumber: string;
  connectionDate: Timestamp;
  status: 'active' | 'inactive';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Notifications Collection (`notifications`)
```typescript
{
  userId: string;
  title: string;
  message: string;
  type: 'bill' | 'complaint' | 'application' | 'system';
  read: boolean;
  actionUrl?: string;
  createdAt: Timestamp;
}
```

---

## 🧪 Testing with Emulator (Optional)

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Initialize Firebase

```bash
firebase init
```

Select:
- Firestore
- Storage
- Emulators

### 4. Start Emulators

```bash
npm run firebase:emulators
```

### 5. Update Environment

```env
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
FIREBASE_EMULATOR_HOST=localhost
```

---

## 🚀 Deployment

### Deploy All

```bash
firebase deploy
```

### Deploy Specific Services

```bash
firebase deploy --only firestore:rules
firebase deploy --only storage
firebase deploy --only hosting
```

---

## 📊 Monitoring & Analytics

### Enable Analytics

1. Go to **Analytics** dashboard
2. View user engagement
3. Monitor app performance

### Set Up Crashlytics (Optional)

1. Add Crashlytics SDK
2. Monitor app crashes
3. Track errors

---

## 🔒 Security Best Practices

1. **Never commit `.env.local`** to Git
2. **Enable App Check** for production
3. **Set up budget alerts** in Google Cloud
4. **Review security rules** regularly
5. **Enable audit logging** for admin actions
6. **Use Firebase Admin SDK** for server operations
7. **Implement rate limiting** on critical operations
8. **Encrypt sensitive data** before storage
9. **Regular security audits** using Firebase Security Rules Simulator

---

## 📝 Next Steps

After Firebase setup:

1. ✅ Test authentication flows
2. ✅ Verify Firestore operations
3. ✅ Test file uploads to Storage
4. ✅ Check security rules
5. ✅ Set up backup schedule
6. ✅ Configure email templates
7. ✅ Enable performance monitoring
8. ✅ Set up CI/CD pipeline

---

## 🆘 Troubleshooting

### Common Issues

**Issue:** Firebase not initializing
- **Solution:** Check environment variables are correct

**Issue:** Permission denied errors
- **Solution:** Review Firestore security rules

**Issue:** Storage upload fails
- **Solution:** Check storage rules and file size limits

**Issue:** Authentication not working
- **Solution:** Verify authorized domains in Firebase Console

---

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Security Rules Guide](https://firebase.google.com/docs/rules)
- [Firestore Data Modeling](https://firebase.google.com/docs/firestore/data-model)
- [Firebase Storage Best Practices](https://firebase.google.com/docs/storage/best-practices)

---

## ✅ Completion Checklist

- [ ] Firebase project created
- [ ] Web app registered
- [ ] Environment variables configured
- [ ] Authentication enabled (Email, Google, Phone)
- [ ] Firestore database created
- [ ] Security rules deployed
- [ ] Indexes created
- [ ] Cloud Storage enabled
- [ ] Storage rules deployed
- [ ] Admin SDK configured
- [ ] Initial data seeded
- [ ] Emulators tested (optional)
- [ ] Production deployment tested

---

**Last Updated:** June 25, 2026
**Firebase SDK Version:** 10.11.0
