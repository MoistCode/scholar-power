import { useState } from "react";
import jwt_decode from 'jwt-decode';


// Determines whether or not a user is considered to be logged in.
export function useEnsureLoggedIn() {
  let userToken = localStorage.getItem('user_token');

  if (userToken) {
    let decodedToken = jwt_decode(userToken);
    console.log('cowman123', decodedToken);

    // if (decodedToken && (Date.now() >= decodedToken?.exp * 1000)) {

    // }    
  }

  let [ token, setToken ] = useState(userToken);
  console.log('cowman useEnsureLoggedIn', token);
  return {
    isLoggedIn: Boolean(token),
    setToken,
  };
}