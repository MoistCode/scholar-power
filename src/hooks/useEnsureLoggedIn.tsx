import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';


// Determines whether or not a user is considered to be logged in.
export function useEnsureLoggedIn() {
  let [ token, setToken ] = useState<string>();

  useEffect(() => {
    if (!token) {
      let userToken = localStorage.getItem('user_token');
  
      if (userToken) {
        let decodedToken = jwt_decode(userToken) as string;
    
        // if (decodedToken && (Date.now() >= decodedToken?.exp * 1000)) {
    
        // }    
  
        setToken(decodedToken);
      }
    }
  }, [token])

  
  console.log('cowman useEnsureLoggedIn', token);
  return {
    isLoggedIn: Boolean(token),
    setToken,
  };
}