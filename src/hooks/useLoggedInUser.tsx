import jwt_decode from 'jwt-decode';

// Determines whether or not a user is considered to be logged in.
export function useLoggedInUser() {
  let userToken = localStorage.getItem('user_token');

  if (!userToken) {
    return null;
  }
  // NOT SECURE. THIS SIMPLY DECODES IT. THERE IS NO VERIFICATION HERE.
  let {
    expired_at: expiredAt,
    username,
    uid,
  } = jwt_decode(userToken) as DecodedToken;

  if (new Date() >= new Date(expiredAt)) {
    localStorage.removeItem('user_token');
    window.location.href = window.location.origin;
  }    

  return { token: userToken, username, uid };
}

type DecodedToken = { uid: string; expired_at: string; username: string };