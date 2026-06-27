export const ROUTES = {
  HOME: '/',
  
  // Authentication
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  AI_ASSISTANT: '/assistant',
  
  // Citizen Routes
  CITIZEN: {
    DASHBOARD: '/citizen/dashboard',
    PROFILE: '/citizen/profile',
    PROPERTY_TAX: '/citizen/property-tax',
    WATER_BILLS: '/citizen/water-bills',
    CERTIFICATES: {
      BASE: '/citizen/certificates',
      BIRTH: '/citizen/certificates/birth',
      DEATH: '/citizen/certificates/death',
      MARRIAGE: '/citizen/certificates/marriage',
    },
    LICENSES: {
      BASE: '/citizen/licenses',
      TRADE: '/citizen/licenses/trade',
      BUILDING: '/citizen/licenses/building',
    },
    COMPLAINTS: {
      BASE: '/citizen/complaints',
      NEW: '/citizen/complaints/new',
      TRACK: '/citizen/complaints/track',
    },
    PAYMENTS: '/citizen/payments',
    NOTIFICATIONS: '/citizen/notifications',
    DIGITAL_LOCKER: '/citizen/digital-locker',
  },
  
  // Officer Routes
  OFFICER: {
    DASHBOARD: '/officer/dashboard',
    TASKS: '/officer/tasks',
    COMPLAINTS: '/officer/complaints',
  },
  
  // Admin Routes
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    DEPARTMENTS: '/admin/departments',
    ANALYTICS: '/admin/analytics',
    REPORTS: '/admin/reports',
    AUDIT_LOGS: '/admin/audit-logs',
    GIS_MAP: '/admin/gis-map',
    SETTINGS: '/admin/settings',
  },
  
  // Public Pages
  ABOUT: '/about',
  CONTACT: '/contact',
  SERVICES: '/services',
  NEWS: '/news',
  RTI: '/rti',
  FAQ: '/faq',
} as const;
