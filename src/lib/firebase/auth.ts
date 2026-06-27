import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  UserCredential,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

// Types
export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  role: 'citizen' | 'officer' | 'admin' | 'superadmin';
  ward?: string;
  address?: string;
  aadharNumber?: string;
  createdAt: any;
  updatedAt: any;
}

// Sign up with email and password
export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName: string,
  additionalData?: Partial<UserData>
): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile
    await updateProfile(user, { displayName });

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName,
      phoneNumber: user.phoneNumber || null,
      photoURL: user.photoURL || null,
      role: 'citizen',
      ...additionalData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return userCredential;
  } catch (error: any) {
    console.error('Error signing up:', error);
    throw new Error(error.message || 'Failed to sign up');
  }
};

// Sign in with email and password
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error: any) {
    console.error('Error signing in:', error);
    throw new Error(error.message || 'Failed to sign in');
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Check if user document exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // Create user document if it doesn't exist
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber || null,
        photoURL: user.photoURL || null,
        role: 'citizen',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    return userCredential;
  } catch (error: any) {
    console.error('Error signing in with Google:', error);
    throw new Error(error.message || 'Failed to sign in with Google');
  }
};

// Sign in with Phone Number
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

export const setupRecaptcha = (containerId: string): RecaptchaVerifier => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      },
    });
  }
  return window.recaptchaVerifier;
};

export const signInWithPhone = async (
  phoneNumber: string,
  recaptchaVerifier: RecaptchaVerifier
): Promise<ConfirmationResult> => {
  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );
    return confirmationResult;
  } catch (error: any) {
    console.error('Error signing in with phone:', error);
    throw new Error(error.message || 'Failed to send OTP');
  }
};

export const verifyOTP = async (
  confirmationResult: ConfirmationResult,
  otp: string
): Promise<UserCredential> => {
  try {
    const userCredential = await confirmationResult.confirm(otp);
    const user = userCredential.user;

    // Check if user document exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // Create user document if it doesn't exist
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL || null,
        role: 'citizen',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    return userCredential;
  } catch (error: any) {
    console.error('Error verifying OTP:', error);
    throw new Error(error.message || 'Invalid OTP');
  }
};

// Sign out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Error signing out:', error);
    throw new Error(error.message || 'Failed to sign out');
  }
};

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error('Error sending password reset email:', error);
    throw new Error(error.message || 'Failed to send password reset email');
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Get user data from Firestore
export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error: any) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (
  uid: string,
  data: Partial<UserData>
): Promise<void> => {
  try {
    await setDoc(
      doc(db, 'users', uid),
      {
        ...data,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    throw new Error(error.message || 'Failed to update profile');
  }
};
