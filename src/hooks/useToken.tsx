import { useState } from 'react';

/**
 * This hook is responsible for managing the authentication token.
 */
export default function useToken() {
  // Attempt to retrieve the token from local storage.
  const getToken = () => {
    const tokenString = localStorage.getItem('token');

    if (!tokenString) {
      return null;
    }

    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  // Save the token to local storage.
  const saveToken = (userToken: { token: string }) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}