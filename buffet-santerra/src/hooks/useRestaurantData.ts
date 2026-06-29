'use client';

import { useEffect, useState } from 'react';
import { parseRestaurantData } from '@/lib/parser';
import type { RestaurantData } from '@/lib/parser';

// Custom hook to fetch and manage restaurant data
export function useRestaurantData() {
  const [data, setData] = useState<RestaurantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        const restaurantData = await parseRestaurantData();
        if (isMounted) {
          setData(restaurantData);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Error desconocido'));
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}