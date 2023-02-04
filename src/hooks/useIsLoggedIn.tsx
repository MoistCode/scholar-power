import { useState } from "react";
import jwt from 'jsonwebtoken';
import { useHistory } from 'react-router-dom';


// Determines whether or not a user is considered to be logged in.
export function useEnsureLoggedIn() {
  let userToken = localStorage.getItem('user_token');

  let history = useHistory();

  if (userToken) {
    let decodedToken = jwt.decode(userToken, {complete: true});
    console.log('cowman123', decodedToken);
    // if (decodedToken && (Date.now() >= decodedToken?.exp * 1000)) {

    // }    
  }

  let [ token, setToken ] = useState(userToken);

  return {
    isLoggedIn: Boolean(token),
    setToken,
  };
}