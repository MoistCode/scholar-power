import { useEffect, useMemo, useState } from "react";
import jwt_decode from 'jwt-decode';


// Determines whether or not a user is considered to be logged in.
export function useEnsureLoggedIn() {
  let [ token, setToken ] = useState<string>();

  useEffect(() => {
    console.log('cowman useEffect token', token);
    console.log('cowman useEffect ls', localStorage.getItem('user_token'));

    if (!token) {
      let userToken = localStorage.getItem('user_token');
  
      if (userToken) {
        let decodedToken = jwt_decode(userToken) as string;
    
        // if (decodedToken && (Date.now() >= decodedToken?.exp * 1000)) {
    
        // }    
        console.log('cowman useEffect', userToken, decodedToken);
        // setToken(decodedToken);
      }
    }
  }, [token])

  
  console.log('cowman useEnsureLoggedIn', token);

  return useMemo(() => ({
    isLoggedIn: Boolean(token),
    setToken,
  }), [token, setToken])
}