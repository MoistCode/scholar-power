import { useCallback, useState } from 'react';
import { getErrorMessage } from '../utils/errorMessage';
import { useLoggedInUser } from './useLoggedInUser';

let baseUrl = process.env.REACT_APP_ENV === 'development'
  ? 'http://0.0.0.0:3000'
  : 'https://test.seismos.io';

export default function useFetch<DataReturnType>() {
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState<string|null>(null);
  let [data, setData] = useState<DataReturnType|null>(null);
  let { token } = useLoggedInUser() || {};

  let fetchDataFn = useCallback(async ({ variables, endpoint, method }: FetchProps) => {
    setLoading(true);
    setError(null);

    try {
      let res = await fetch(`${baseUrl}${endpoint}`,{
        method,
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${token}`,
        },
        body: variables ? JSON.stringify(variables) : undefined,
        credentials: 'include',
      });

      let json = await res.json();
      console.log(json);
      setData(json);
      setError(null);
    } catch (err: unknown) {
      const errMsg = getErrorMessage(err);
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const reset = () => {
    setLoading(false);
    setError(null);
    setData(null);
  };

  return {
    fetchDataFn,
    clearError: () => setError(null),
    loading,
    error,
    data,
    reset,
  };
}

type FetchProps = {
  variables?: object;
  endpoint: string;
  method: 'GET'|'POST'|'PUT'|'DELETE';
};