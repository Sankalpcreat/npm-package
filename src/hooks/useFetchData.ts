
import { useState, useEffect } from 'react';

export function useFetchData(url: string) {
  const [data, setData] = useState<any>(null);
  const [pending, setPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const result = await res.json();
        setData(result);
        setPending(false);
      } catch (err) {
        setError((err as Error).message);
        setPending(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, pending, error };
}
