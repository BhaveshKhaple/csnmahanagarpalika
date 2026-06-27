# Firebase Setup Guide

## Overview

This guide will help you set up Firebase for the Smart Municipal Citizen Portal.

## Prerequisites

- Node.js 20+ installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- Google account
- Firebase project created

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `smart-municipal-portal`
4. Enable Google Analytics (recommended)
5. Create project

## Step 2: Enable Firebase Services

### Authentication
1. Go to **Authentication** > **Get started**
2. Enable sign-in methods:
   - ✅ Email/Password
   - ✅ Phone
   - ✅ Google
   - ✅ Facebook (optional)

3. Set up authorized domains

### Firestore Database
1. Go to **Firestore Database** > **Create database**
2. Choose **Production mode**
3. Select closest region
4. Click **Enable**

### Storage
1. Go to **Storage** > **Get started**
2. Choose **Production mode**
3. Click **Done**

### Cloud Functions
1. Go to **Functions**
2. Click **Get started**
3. Upgrade to **Blaze plan** (pay-as-you-go)

### Hosting
1. Go to **Hosting** > **Get started**
2. Follow the setup wizard

## Step 3: Get Firebase Configuration

1. Go to **Project settings** (gear icon)
2. Scroll to **Your apps**
3. Click **Web icon** (</>)
4. Register app name: `Smart Municipal Portal`
5. Copy the configuration:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx",
  measurementId: "G-XXXXXXXXXX"
};
```

## Step 4: Configure Environment Variables

Create `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Update with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Step 5: Setup Firebase Admin SDK (for Cloud Functions)

1. Go to **Project settings** > **Service accounts**
2. Click **Generate new private key**
3. Download JSON file
4. Save it as `firebase/serviceAccountKey.json` (DO NOT commit to git!)

Add to `.env.local`:

```env
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key\n-----END PRIVATE KEY-----\n"
```

## Step 6: Initialize Firebase in Project

```bash
# Login to Firebase
firebase login

# Initialize Firebase
firebase init

# Select:
# ◉ Firestore
# ◉ Functions
# ◉ Hosting
# ◉ Storage

# Follow the prompts:
# - Existing project: smart-municipal-portal
# - Firestore rules: firebase/firestore.rules
# - Firestore indexes: firebase/firestore.indexes.json
# - Functions language: TypeScript
# - Functions directory: firebase/functions
# - Storage rules: firebase/storage.rules
# - Hosting public directory: out
```

## Step 7: Firestore Security Rules

Create `firebase/firestore.rules`:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }
    
    function hasRole(role) {
      return isSignedIn() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == role;
    }
    
    function isAdmin() {
      return hasRole('admin') || hasRole('super_admin');
    }
    
    function isOfficer() {
      return hasRole('officer') || hasRole('department_head') || isAdmin();
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update: if isOwner(userId) || isAdmin();
      allow delete: if isAdmin();
      
      match /notifications/{notificationId} {
        allow read: if isOwner(userId);
        allow write: if false; // Only via Cloud Functions
      }
    }
    
    // Departments collection
    match /departments/{departmentId} {
      allow read: if isSignedIn();
      allow write: if isAdmin();
    }
    
    // Properties collection
    match /properties/{propertyId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update: if isOwner(resource.data.ownerId) || isOfficer();
      allow delete: if isAdmin();
    }
    
    // Complaints collection
    match /complaints/{complaintId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update: if isOwner(resource.data.citizenId) || isOfficer();
      allow delete: if isAdmin();
      
      match /attachments/{attachmentId} {
        allow read: if isSignedIn();
        allow write: if isOwner(get(/databases/$(database)/documents/complaints/$(complaintId)).data.citizenId);
      }
    }
    
    // Payments collection
    match /payments/{paymentId} {
      allow read: if isOwner(resource.data.userId) || isOfficer();
      allow create: if isSignedIn();
      allow update: if false; // Only via Cloud Functions
      allow delete: if false;
    }
    
    // Certificates collection
    match /certificates/{type}/{certificateId} {
      allow read: if isOwner(resource.data.applicantId) || isOfficer();
      allow create: if isSignedIn();
      allow update: if isOfficer();
      allow delete: if isAdmin();
    }
    
    // Licenses collection
    match /licenses/{type}/{licenseId} {
      allow read: if isOwner(resource.data.applicantId) || isOfficer();
      allow create: if isSignedIn();
      allow update: if isOfficer();
      allow delete: if isAdmin();
    }
    
    // Audit logs (read-only for admins)
    match /auditLogs/{logId} {
      allow read: if isAdmin();
      allow write: if false; // Only via Cloud Functions
    }
    
    // System settings
    match /systemSettings/{settingId} {
      allow read: if isSignedIn();
      allow write: if isAdmin();
    }
  }
}
```

## Step 8: Storage Security Rules

Create `firebase/storage.rules`:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isValidImageFile() {
      return request.resource.contentType.matches('image/.*') &&
             request.resource.size < 10 * 1024 * 1024; // 10MB
    }
    
    function isValidVideoFile() {
      return request.resource.contentType.matches('video/.*') &&
             request.resource.size < 50 * 1024 * 1024; // 50MB
    }
    
    function isValidDocumentFile() {
      return request.resource.contentType in ['application/pdf', 'application/msword'] &&
             request.resource.size < 5 * 1024 * 1024; // 5MB
    }
    
    // User avatars
    match /avatars/{userId}/{fileName} {
      allow read: if isSignedIn();
      allow write: if isOwner(userId) && isValidImageFile();
    }
    
    // Complaint attachments
    match /complaints/{complaintId}/{fileName} {
      allow read: if isSignedIn();
      allow write: if isSignedIn() && (isValidImageFile() || isValidVideoFile());
    }
    
    // Certificate documents
    match /certificates/{type}/{certificateId}/{fileName} {
      allow read: if isSignedIn();
      allow write: if isSignedIn() && (isValidImageFile() || isValidDocumentFile());
    }
    
    // License documents
    match /licenses/{type}/{licenseId}/{fileName} {
      allow read: if isSignedIn();
      allow write: if isSignedIn() && (isValidImageFile() || isValidDocumentFile());
    }
    
    // Digital locker
    match /digital-locker/{userId}/{fileName} {
      allow read: if isOwner(userId);
      allow write: if isOwner(userId) && (isValidImageFile() || isValidDocumentFile());
    }
    
    // Payment receipts (read-only after creation)
    match /receipts/{paymentId}/{fileName} {
      allow read: if isSignedIn();
      allow write: if false; // Only via Cloud Functions
    }
  }
}
```

## Step 9: Firestore Indexes

Create `firebase/firestore.indexes.json`:

```json
{
  "indexes": [
    {
      "collectionGroup": "complaints",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "citizenId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "complaints",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "assignedDepartmentId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "priority", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "payments",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "notifications",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "isRead", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    }
  ],
  "fieldOverrides": []
}
```

## Step 10: Deploy Firebase Configuration

```bash
# Deploy Firestore rules and indexes
firebase deploy --only firestore

# Deploy Storage rules
firebase deploy --only storage
```

## Step 11: Set up Cloud Functions

```bash
cd firebase/functions
npm install
```

## Step 12: Test with Firebase Emulators

```bash
# Start emulators
firebase emulators:start

# In another terminal, run Next.js
npm run dev
```

Access:
- Emulator UI: http://localhost:4000
- Firestore: http://localhost:8080
- Functions: http://localhost:5001

## Step 13: Deploy to Production

```bash
# Build Next.js app
npm run build
npm run export

# Deploy everything
firebase deploy

# Or deploy specific services
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore
firebase deploy --only storage
```

## Additional Configuration

### Enable Firebase Extensions

1. **Resize Images**: Automatically resize uploaded images
```bash
firebase ext:install storage-resize-images
```

2. **Trigger Email**: Send emails via Cloud Functions
```bash
firebase ext:install firestore-send-email
```

3. **Translate Text**: Translate content
```bash
firebase ext:install firestore-translate-text
```

### Set up Firebase Performance Monitoring

Add to your app:
```typescript
import { getPerformance } from 'firebase/performance';

const perf = getPerformance(app);
```

### Set up Firebase Analytics

Analytics is automatically enabled if you provided a measurement ID.

## Troubleshooting

### Issue: Permission Denied
- Check Firestore security rules
- Verify user authentication
- Check custom claims

### Issue: Function Timeout
- Increase timeout in `firebase.json`
- Optimize function code
- Use background functions for long operations

### Issue: Storage Upload Fails
- Check storage rules
- Verify file size limits
- Check file type restrictions

## Security Best Practices

1. ✅ Never commit `serviceAccountKey.json`
2. ✅ Use environment variables for secrets
3. ✅ Enable App Check for production
4. ✅ Implement rate limiting
5. ✅ Regular security rules audits
6. ✅ Monitor unusual activity
7. ✅ Use custom claims for roles
8. ✅ Enable MFA for admin accounts

## Cost Optimization

1. Use Firebase Emulators for development
2. Implement pagination for queries
3. Cache frequently accessed data
4. Use Cloud Functions efficiently
5. Monitor usage in Firebase Console
6. Set up budget alerts

## Next Steps

1. ✅ Complete Firebase setup
2. ✅ Configure environment variables
3. ✅ Deploy security rules
4. ✅ Test with emulators
5. ✅ Set up CI/CD pipeline
6. ✅ Deploy to production

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Cloud Functions Guide](https://firebase.google.com/docs/functions)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
