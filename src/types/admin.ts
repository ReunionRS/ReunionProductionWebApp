import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

export interface AdminUser {
  uid: string;
  email: string;
  isAdmin: boolean;
  lastLogin: Timestamp;
}

export interface AdminContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}