import { useState, useEffect } from 'react';
import { QueryConstraint } from 'firebase/firestore';
import { FirestoreService } from '@/lib/firestore';

export function useFirestore<T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = FirestoreService.subscribeToCollection<T>(
      collectionName,
      (newData) => {
        setData(newData);
        setLoading(false);
      },
      constraints
    );

    return () => unsubscribe();
  }, [collectionName, constraints]);

  return { data, loading, error };
}

export function useDocument<T>(collectionName: string, id: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    FirestoreService.read<T>(collectionName, id)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [collectionName, id]);

  return { data, loading, error };
}