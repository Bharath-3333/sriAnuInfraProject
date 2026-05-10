// ─── Project Types ───────────────────────────────────────────────────────────

export interface Project {
  id: number;
  serialNumber: number;
  clientName: string;
  capacityKw: number;
  location: string;
  annualGenerationKwh: number;
  projectType: ProjectType;
  status: ProjectStatus;
  completedYear?: number;
  description?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProjectType =
  | 'ROOFTOP_ON_GRID'
  | 'GROUND_MOUNT'
  | 'HYBRID'
  | 'OFF_GRID';

export type ProjectStatus = 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING';

// ─── Contact / Enquiry ───────────────────────────────────────────────────────

export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  subject: string;
  serviceType: ServiceType;
  message: string;
}

export interface ContactResponse {
  id: number;
  message: string;
  timestamp: string;
}

export type ServiceType =
  | 'ROOFTOP_SOLAR'
  | 'GROUND_MOUNT'
  | 'NET_METERING'
  | 'MAINTENANCE'
  | 'CONSULTATION'
  | 'OTHER';

// ─── Enquiry ─────────────────────────────────────────────────────────────────

export interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  serviceType: ServiceType;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}

export type EnquiryStatus = 'PENDING' | 'READ' | 'REPLIED' | 'CLOSED';

// ─── API Responses ───────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
  status: number;
  timestamp: string;
  path?: string;
}

// ─── Statistics ───────────────────────────────────────────────────────────────

export interface CompanyStats {
  totalProjects: number;
  totalCapacityKw: number;
  totalAnnualKwh: number;
  yearsOfExperience: number;
}

// ─── Service Item ─────────────────────────────────────────────────────────────

export interface ServiceItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

// ─── Nav Item ─────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}