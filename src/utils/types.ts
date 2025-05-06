export interface ApiResponse<T = unknown> {
  message: string;
  response: T;
  httpStatus: string;
  totalElements: number;
  totalPages: number;
}

export interface ProfileData {
  id?: number;
  firstName: string;
  lastName: string;
  email?: string;
  countryCode: string;
  mobileNumber: string;
  termsAccepted?: boolean;
  profilePic?: string;
  profilePicFileName?: string;
  hederaAccountId?: string;
  accountStatus?: "ACTIVE" | "IN_ACTIVE" | string;
  role?: "APP_ADMIN";
  createdAt?: string;
  updatedAt?: string;
}

export interface FaqItem {
  faqId?: number;
  question: string;
  answer: string;
  adminMail?: string;
  createdAt?: string;
  updatedAt?: string;
  status: string;
  category: string;
}
export interface VideoItem {
  id?: number;
  title: string;
  description: string;
  videoUrl: string;
  createdAt?: string;
  updatedAt?: string;
  status: string;
}
