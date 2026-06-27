// Common Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'citizen' | 'officer' | 'department_head' | 'admin' | 'super_admin';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Complaint Types
export interface Complaint {
  id: string;
  complaintNumber: string;
  citizenId: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  priority: Priority;
  location?: {
    address: string;
    latitude: number;
    longitude: number;
  };
  attachments?: ComplaintAttachment[];
  assignedTo?: string;
  assignedDepartment?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

export type ComplaintCategory =
  | 'roads'
  | 'water'
  | 'garbage'
  | 'drainage'
  | 'street_lights'
  | 'public_health'
  | 'trees'
  | 'animals'
  | 'illegal_construction'
  | 'noise_pollution'
  | 'other';

export type ComplaintStatus =
  | 'submitted'
  | 'assigned'
  | 'in_progress'
  | 'resolved'
  | 'closed'
  | 'rejected';

export type Priority = 'low' | 'medium' | 'high' | 'critical';

export interface ComplaintAttachment {
  id: string;
  type: 'image' | 'video' | 'document';
  url: string;
  fileName: string;
  size: number;
}

// Payment Types
export interface Payment {
  id: string;
  transactionId: string;
  userId: string;
  amount: number;
  paymentType: PaymentType;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  receiptNumber?: string;
  receiptUrl?: string;
  createdAt: Date;
}

export type PaymentType = 'property_tax' | 'water_bill' | 'license_fee' | 'certificate_fee';
export type PaymentMethod = 'card' | 'net_banking' | 'upi' | 'wallet';
export type PaymentStatus = 'pending' | 'success' | 'failed' | 'refunded';

// Certificate Types
export interface Certificate {
  id: string;
  certificateNumber: string;
  type: CertificateType;
  applicantId: string;
  status: ApplicationStatus;
  createdAt: Date;
  issuedAt?: Date;
}

export type CertificateType = 'birth' | 'death' | 'marriage';
export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'issued';

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: Date;
}

export type NotificationType = 'info' | 'warning' | 'success' | 'error';
