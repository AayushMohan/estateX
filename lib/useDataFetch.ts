import { Alert } from "react-native";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";

interface UseDataFetchOptions<T, P extends Record<string, string | number>> {
  fn: (params: P) => Promise<T>;
  params?: P;
  skip?: boolean;
}

interface UseDataFetchReturn<T, P> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (newParams?: P) => Promise<void>;
}

export const useDataFetch = <T, P extends Record<string, string | number>>({
  fn,
  params,
  skip = false,
}: UseDataFetchOptions<T, P>): UseDataFetchReturn<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);

  const fallbackParams = useMemo(() => params ?? ({} as P), [params]);
  const paramsKey = useMemo(
    () => JSON.stringify(fallbackParams),
    [fallbackParams]
  );
  const paramsRef = useRef(fallbackParams);

  useEffect(() => {
    paramsRef.current = fallbackParams;
  }, [paramsKey, fallbackParams]);

  const fetchData = useCallback(
    async (fetchParams?: P) => {
      setLoading(true);
      setError(null);

      try {
        const resolvedParams = fetchParams ?? paramsRef.current;
        const result = await fn(resolvedParams);
        setData(result);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  useEffect(() => {
    if (!skip) {
      fetchData(paramsRef.current);
    }
  }, [fetchData, skip, paramsKey]);

  const refetch = async (newParams?: P) => {
    await fetchData(newParams ?? paramsRef.current);
  };

  return { data, loading, error, refetch };
};
