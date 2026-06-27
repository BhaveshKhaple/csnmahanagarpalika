import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  UploadTaskSnapshot,
} from 'firebase/storage';
import { storage } from './config';

// Upload file
export const uploadFile = async (
  file: File,
  path: string,
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    
    if (onProgress) {
      // Upload with progress tracking
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot: UploadTaskSnapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(progress);
          },
          (error) => {
            console.error('Error uploading file:', error);
            reject(new Error(error.message || 'Failed to upload file'));
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    } else {
      // Simple upload without progress
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    }
  } catch (error: any) {
    console.error('Error uploading file:', error);
    throw new Error(error.message || 'Failed to upload file');
  }
};

// Upload multiple files
export const uploadMultipleFiles = async (
  files: File[],
  basePath: string,
  onProgress?: (fileIndex: number, progress: number) => void
): Promise<string[]> => {
  try {
    const uploadPromises = files.map((file, index) => {
      const path = `${basePath}/${Date.now()}_${file.name}`;
      return uploadFile(file, path, (progress) => {
        if (onProgress) {
          onProgress(index, progress);
        }
      });
    });

    return await Promise.all(uploadPromises);
  } catch (error: any) {
    console.error('Error uploading multiple files:', error);
    throw new Error(error.message || 'Failed to upload files');
  }
};

// Delete file
export const deleteFile = async (path: string): Promise<void> => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error: any) {
    console.error('Error deleting file:', error);
    throw new Error(error.message || 'Failed to delete file');
  }
};

// Delete multiple files
export const deleteMultipleFiles = async (paths: string[]): Promise<void> => {
  try {
    const deletePromises = paths.map((path) => deleteFile(path));
    await Promise.all(deletePromises);
  } catch (error: any) {
    console.error('Error deleting multiple files:', error);
    throw new Error(error.message || 'Failed to delete files');
  }
};

// Get file download URL
export const getFileURL = async (path: string): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
  } catch (error: any) {
    console.error('Error getting file URL:', error);
    throw new Error(error.message || 'Failed to get file URL');
  }
};

// List all files in a directory
export const listFiles = async (path: string): Promise<string[]> => {
  try {
    const storageRef = ref(storage, path);
    const result = await listAll(storageRef);
    
    const urls = await Promise.all(
      result.items.map((itemRef) => getDownloadURL(itemRef))
    );
    
    return urls;
  } catch (error: any) {
    console.error('Error listing files:', error);
    throw new Error(error.message || 'Failed to list files');
  }
};

// Specific upload functions for different document types

// Upload complaint images
export const uploadComplaintImages = async (
  userId: string,
  complaintId: string,
  images: File[]
): Promise<string[]> => {
  const basePath = `complaints/${userId}/${complaintId}`;
  return uploadMultipleFiles(images, basePath);
};

// Upload application documents
export const uploadApplicationDocuments = async (
  userId: string,
  applicationId: string,
  documents: { [key: string]: File }
): Promise<{ [key: string]: string }> => {
  try {
    const uploadPromises = Object.entries(documents).map(async ([key, file]) => {
      const path = `applications/${userId}/${applicationId}/${key}_${Date.now()}_${file.name}`;
      const url = await uploadFile(file, path);
      return [key, url];
    });

    const results = await Promise.all(uploadPromises);
    return Object.fromEntries(results);
  } catch (error: any) {
    console.error('Error uploading application documents:', error);
    throw new Error(error.message || 'Failed to upload documents');
  }
};

// Upload user profile photo
export const uploadProfilePhoto = async (
  userId: string,
  file: File
): Promise<string> => {
  const path = `users/${userId}/profile_${Date.now()}.jpg`;
  return uploadFile(file, path);
};

// Upload property documents
export const uploadPropertyDocuments = async (
  userId: string,
  propertyId: string,
  documents: File[]
): Promise<string[]> => {
  const basePath = `properties/${userId}/${propertyId}`;
  return uploadMultipleFiles(documents, basePath);
};

// Helper function to get file extension
export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

// Helper function to validate file type
export const validateFileType = (
  file: File,
  allowedTypes: string[]
): boolean => {
  const extension = getFileExtension(file.name).toLowerCase();
  return allowedTypes.includes(extension);
};

// Helper function to validate file size (in MB)
export const validateFileSize = (file: File, maxSizeMB: number): boolean => {
  const fileSizeMB = file.size / (1024 * 1024);
  return fileSizeMB <= maxSizeMB;
};
