import jwt_decode from 'jwt-decode';


// Determines whether or not a user is considered to be logged in.
export function useIsLoggedIn() {
  let userToken = localStorage.getItem('user_token');
  
  if (userToken) {
    let decodedToken = jwt_decode(userToken) as string;

    // if (decodedToken && (Date.now() >= decodedToken?.exp * 1000)) {

    // }    
    console.log('cowman useEffect', userToken, decodedToken);
  }

  return Boolean(userToken);
}