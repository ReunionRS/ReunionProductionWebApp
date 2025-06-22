import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  UploadTask,
} from 'firebase/storage';
import { storage } from './firebase';

export class StorageService {
  static async uploadFile(
    file: File, 
    path: string, 
    onProgress?: (progress: number) => void
  ): Promise<string> {
    const storageRef = ref(storage, path);
    
    if (onProgress) {
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(progress);
          },
          (error) => reject(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    } else {
      const snapshot = await uploadBytes(storageRef, file);
      return getDownloadURL(snapshot.ref);
    }
  }

  static async deleteFile(path: string): Promise<void> {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  }

  static getFileRef(path: string) {
    return ref(storage, path);
  }
}