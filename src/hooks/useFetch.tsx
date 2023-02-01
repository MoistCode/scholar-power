import { useCallback } from 'react';

export default function useFetch() {
  let fetchDataFn = useCallback(async ({ variables, endpoint, method }: FetchProps) => {
    let res = await fetch(`https://test.seismos.io${endpoint}`,{
      method,
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify(variables),
      credentials: 'include',
    });

    return res;
  }, []);

  return fetchDataFn;
}

type FetchProps = {
  variables: object;
  endpoint: string;
  method: 'GET'|'POST';
}