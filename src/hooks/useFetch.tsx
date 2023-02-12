import { useCallback, useState } from 'react';

let baseUrl = process.env.REACT_APP_ENV === 'development'
  ? 'http://0.0.0.0:3000'
  : 'https://test.seismos.io';

export default function useFetch() {
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [data, setData] = useState(null);

  let fetchDataFn = useCallback(async ({ variables, endpoint, method }: FetchProps) => {
    setLoading(true);
    setError(null);

    try {
      console.log('cowman usefetch', process.env.REACT_APP_API_KEY)
      let res = await fetch(`${baseUrl}${endpoint}`,{
        method,
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
        body: variables ? JSON.stringify(variables) : undefined,
        credentials: 'include',
      });

      let json = await res.json();
  
      setData(json);
      setError(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchDataFn,
    clearError: () => setError(null),
    loading,
    error,
    data,
  };
}

type FetchProps = {
  variables?: object;
  endpoint: string;
  method: 'GET'|'POST';
};