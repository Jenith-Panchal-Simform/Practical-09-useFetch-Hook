import { useEffect, useState } from "react";

export const useFetch = <T>(
  URL: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  payload?: Record<string, unknown>,
  skip?: boolean,
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const stringifiedPayload = payload ? JSON.stringify(payload) : null;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(URL, {
          method,
          headers: payload ? { "Content-Type": "application/json" } : undefined,
          body:
            method !== "GET" && method !== "DELETE"
              ? stringifiedPayload
              : undefined,
        });
        if (!response.ok) {
          throw new Error("Fetchind Data Error");
        }
        const result = await response.json();
        if (result) {
          setData(result);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (!skip) {
      fetchData();
    }
  }, [URL, method, skip, stringifiedPayload, payload]);
  return { data, isLoading, error };
};
