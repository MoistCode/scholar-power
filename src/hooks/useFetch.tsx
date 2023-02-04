import { useCallback } from 'react';

let baseUrl = process.env.REACT_APP_ENV === 'development'
  ? 'http://0.0.0.0:3000'
  : 'https://test.seismos.io';

export default function useFetch() {
  let fetchDataFn = useCallback(async ({ variables, endpoint, method }: FetchProps) => {
    let res = await fetch(`${baseUrl}${endpoint}`,{
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