import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';


// Determines whether or not a user is considered to be logged in.
export function useEnsureLoggedIn() {
  let [ token, setToken ] = useState<string>();

  useEffect(() => {
    let userToken = localStorage.getItem('user_token');
  
    if (userToken) {
      let decodedToken = jwt_decode(userToken) as string;
      console.log('cowman123', decodedToken);
  
      // if (decodedToken && (Date.now() >= decodedToken?.exp * 1000)) {
  
      // }    

      setToken(decodedToken);
    }
  }, [])

  
  console.log('cowman useEnsureLoggedIn', token);
  return {
    isLoggedIn: Boolean(token),
    setToken,
  };
}