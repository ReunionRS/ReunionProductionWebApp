import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from './firebase';

// Универсальные CRUD операции
export class FirestoreService {
  static async create<T extends Record<string, any>>(
    collectionName: string, 
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
  ) {
    const docData = {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    
    const docRef = await addDoc(collection(db, collectionName), docData);
    return docRef.id;
  }

  static async read<T>(collectionName: string, id: string): Promise<T | null> {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  }

  static async update<T extends Record<string, any>>(
    collectionName: string, 
    id: string, 
    data: Partial<Omit<T, 'id' | 'createdAt'>>
  ) {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  }

  static async delete(collectionName: string, id: string) {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  }

  static async getCollection<T>(
    collectionName: string, 
    constraints: QueryConstraint[] = []
  ): Promise<T[]> {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
  }

  static subscribeToCollection<T>(
    collectionName: string,
    callback: (data: T[]) => void,
    constraints: QueryConstraint[] = []
  ) {
    const q = query(collection(db, collectionName), ...constraints);
    
    return onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
      callback(data);
    });
  }
}

// Конкретные сервисы
export const userService = {
  async getUserProfile(uid: string) {
    return FirestoreService.read<UserProfile>('users', uid);
  },

  async updateUserProfile(uid: string, data: Partial<UserProfile>) {
    return FirestoreService.update('users', uid, data);
  },
};