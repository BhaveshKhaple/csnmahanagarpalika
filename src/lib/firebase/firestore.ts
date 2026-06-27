import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryConstraint,
  serverTimestamp,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';

// Generic CRUD operations

// Create document
export const createDocument = async (
  collectionName: string,
  data: any,
  docId?: string
): Promise<string> => {
  try {
    const docData = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    if (docId) {
      await setDoc(doc(db, collectionName, docId), docData);
      return docId;
    } else {
      const docRef = await addDoc(collection(db, collectionName), docData);
      return docRef.id;
    }
  } catch (error: any) {
    console.error('Error creating document:', error);
    throw new Error(error.message || 'Failed to create document');
  }
};

// Read document
export const getDocument = async (
  collectionName: string,
  docId: string
): Promise<DocumentData | null> => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error: any) {
    console.error('Error getting document:', error);
    throw new Error(error.message || 'Failed to get document');
  }
};

// Update document
export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: any
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error: any) {
    console.error('Error updating document:', error);
    throw new Error(error.message || 'Failed to update document');
  }
};

// Delete document
export const deleteDocument = async (
  collectionName: string,
  docId: string
): Promise<void> => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error: any) {
    console.error('Error deleting document:', error);
    throw new Error(error.message || 'Failed to delete document');
  }
};

// Get all documents from collection
export const getAllDocuments = async (
  collectionName: string,
  constraints?: QueryConstraint[]
): Promise<DocumentData[]> => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = constraints ? query(collectionRef, ...constraints) : collectionRef;
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error: any) {
    console.error('Error getting documents:', error);
    throw new Error(error.message || 'Failed to get documents');
  }
};

// Query documents with filters
export const queryDocuments = async (
  collectionName: string,
  filters: { field: string; operator: any; value: any }[],
  orderByField?: string,
  limitCount?: number
): Promise<DocumentData[]> => {
  try {
    const collectionRef = collection(db, collectionName);
    const constraints: QueryConstraint[] = [];

    // Add where clauses
    filters.forEach((filter) => {
      constraints.push(where(filter.field, filter.operator, filter.value));
    });

    // Add orderBy
    if (orderByField) {
      constraints.push(orderBy(orderByField, 'desc'));
    }

    // Add limit
    if (limitCount) {
      constraints.push(limit(limitCount));
    }

    const q = query(collectionRef, ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error: any) {
    console.error('Error querying documents:', error);
    throw new Error(error.message || 'Failed to query documents');
  }
};

// Specific collection operations

// Complaints
export const createComplaint = async (complaintData: any) => {
  return createDocument('complaints', complaintData);
};

export const getComplaint = async (complaintId: string) => {
  return getDocument('complaints', complaintId);
};

export const updateComplaint = async (complaintId: string, data: any) => {
  return updateDocument('complaints', complaintId, data);
};

export const getUserComplaints = async (userId: string) => {
  return queryDocuments(
    'complaints',
    [{ field: 'userId', operator: '==', value: userId }],
    'createdAt',
    50
  );
};

// Applications (Certificates & Licenses)
export const createApplication = async (applicationType: string, applicationData: any) => {
  return createDocument('applications', {
    ...applicationData,
    type: applicationType,
  });
};

export const getApplication = async (applicationId: string) => {
  return getDocument('applications', applicationId);
};

export const updateApplication = async (applicationId: string, data: any) => {
  return updateDocument('applications', applicationId, data);
};

export const getUserApplications = async (userId: string) => {
  return queryDocuments(
    'applications',
    [{ field: 'userId', operator: '==', value: userId }],
    'createdAt',
    50
  );
};

// Bills
export const createBill = async (billData: any) => {
  return createDocument('bills', billData);
};

export const getBill = async (billId: string) => {
  return getDocument('bills', billId);
};

export const updateBill = async (billId: string, data: any) => {
  return updateDocument('bills', billId, data);
};

export const getUserBills = async (userId: string) => {
  return queryDocuments(
    'bills',
    [{ field: 'userId', operator: '==', value: userId }],
    'dueDate',
    50
  );
};

// Payments
export const createPayment = async (paymentData: any) => {
  return createDocument('payments', paymentData);
};

export const getPayment = async (paymentId: string) => {
  return getDocument('payments', paymentId);
};

export const getUserPayments = async (userId: string) => {
  return queryDocuments(
    'payments',
    [{ field: 'userId', operator: '==', value: userId }],
    'createdAt',
    50
  );
};

// Notifications
export const createNotification = async (notificationData: any) => {
  return createDocument('notifications', notificationData);
};

export const getUserNotifications = async (userId: string) => {
  return queryDocuments(
    'notifications',
    [{ field: 'userId', operator: '==', value: userId }],
    'createdAt',
    50
  );
};

export const markNotificationAsRead = async (notificationId: string) => {
  return updateDocument('notifications', notificationId, { read: true });
};

// Properties
export const getProperty = async (propertyId: string) => {
  return getDocument('properties', propertyId);
};

export const getUserProperties = async (userId: string) => {
  return queryDocuments(
    'properties',
    [{ field: 'ownerId', operator: '==', value: userId }],
    'createdAt'
  );
};

// Water Connections
export const getWaterConnection = async (connectionId: string) => {
  return getDocument('waterConnections', connectionId);
};

export const getUserWaterConnections = async (userId: string) => {
  return queryDocuments(
    'waterConnections',
    [{ field: 'ownerId', operator: '==', value: userId }],
    'createdAt'
  );
};
