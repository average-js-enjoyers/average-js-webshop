// src/utils/oauthConfig.js

// Encapsulate all configurations into a single object that can be exported
const oauthConfig = {
  google: {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.REACT_APP_GOOGLE_REDIRECT_URI,
    scope: process.env.REACT_APP_GOOGLE_SCOPE,
    tokenExchangeUrl: "https://oauth2.googleapis.com/token",
    baseUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  },
  facebook: {
    clientId: process.env.REACT_APP_FACEBOOK_APP_ID, //appId in Facebook Developers Console
    clientSecret: process.env.REACT_APP_FACEBOOK_APP_SECRET, //appSecret in Facebook Developers Console
    redirectUri: process.env.REACT_APP_FACEBOOK_REDIRECT_URI,
    scope: process.env.REACT_APP_FACEBOOK_SCOPE,
    tokenExchangeUrl: "https://graph.facebook.com/v18.0/oauth/access_token",
    baseUrl: "https://www.facebook.com/v18.0/dialog/oauth",
  },
};

export default oauthConfig;
