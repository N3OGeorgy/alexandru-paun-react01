import { login, logout } from '../actions/creators/auth';
import store from '../store';

let eventBound = false;
const googleOauthAppId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

if (googleOauthAppId.length === undefined) {
  throw new Error('Google Client id not found');
}

const authenticationChangeHandler = (isAuthenticated, googleUser) => {
  if (isAuthenticated) {
    const user = googleUser.getBasicProfile();
    store.dispatch(login(buildGoogleUserBasicProfile(user)));
    // console.log(googleUser);
  } else {
    store.dispatch(logout());
  }
};

const buildGoogleUserBasicProfile = (googleUser) => {
  return {
    id: googleUser.getId(),
    firstName: googleUser.getGivenName(),
    lastName: googleUser.getFamilyName(),
    email: googleUser.getEmail(),
    avatar: googleUser.getImageUrl(),
  };
};

// recipe
export const initializeGoogleAuth = async () => {
  return new Promise((resolve) => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: 'email profile',
        })
        .then(() => {
          const GoogleAuth = window.gapi.auth2.getAuthInstance();
          const googleUser = GoogleAuth.currentUser.get();

          if (!eventBound) {
            GoogleAuth.isSignedIn.listen((isAuthenticated) => {
              authenticationChangeHandler(isAuthenticated, googleUser);
            });

            authenticationChangeHandler(
              GoogleAuth.isSignedIn.get(),
              googleUser,
            );

            eventBound = true;
          }

          resolve(GoogleAuth);
        });
    });
  });
};
