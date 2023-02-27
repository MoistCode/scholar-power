import jwt_decode from 'jwt-decode';

// Determines whether or not a user is considered to be logged in.
export const useLoggedInUser = () => {
  let userToken = localStorage.getItem('user_token');
  let username: string | undefined;
  let uid: string | undefined;

  if (userToken) {
    try {
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
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }
  // NOT SECURE. THIS SIMPLY DECODES IT. THERE IS NO VERIFICATION HERE.

  return {
    token: userToken,
    username,
    uid,
  };
};

type DecodedToken = { uid: string; expired_at: string; username: string };
