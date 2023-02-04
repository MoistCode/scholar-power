import jwt_decode from 'jwt-decode';


// Determines whether or not a user is considered to be logged in.
export function useIsLoggedIn() {
  let userToken = localStorage.getItem('user_token');
  
  if (userToken) {
    let { expired_at: expiredAt } = jwt_decode(userToken) as { expired_at: string };

    if (new Date() >= new Date(expiredAt)) {
      localStorage.removeItem('user_token');
      window.location.href = window.location.origin;
    }    
  }

  return Boolean(userToken);
}