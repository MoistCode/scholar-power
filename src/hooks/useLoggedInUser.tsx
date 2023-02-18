import jwt_decode from 'jwt-decode';

// Determines whether or not a user is considered to be logged in.
export const useLoggedInUser = () => {
  let userToken = localStorage.getItem('user_token');
  let username: string | undefined;
  let uid: string | undefined;

  if (userToken) {
    let {
      expired_at: expiredAt,
      username: decodedUsername,
      uid: decodedUid
    } = jwt_decode(userToken) as DecodedToken;

    username = decodedUsername;
    uid = decodedUid;
  
    if (new Date() >= new Date(expiredAt)) {
      localStorage.removeItem('user_token');
      window.location.href = window.location.origin;
    }    
  }
  // NOT SECURE. THIS SIMPLY DECODES IT. THERE IS NO VERIFICATION HERE.

  const redirectIfNotLoggedIn = () => {
    if (!username || !userToken || !uid) {
      window.location.href = window.location.origin;
    }
  };

  return {
    token: userToken,
    username,
    uid,
    redirectIfNotLoggedIn,
  };
};

type DecodedToken = { uid: string; expired_at: string; username: string };
