import jsSHA from "jssha";

// Google Constants
export const clientId =
  "1053966644924-fornicn3hjv71v74tshvep32sa6u7erl.apps.googleusercontent.com";
export const clientSecret = "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";
export const redirectUri = "http://localhost:3000/oauth/google";
export const scope =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

// Facebook Constants
export const facebookAppId = "1781823298942364";
export const facebookAppSecret = "d92dfb2a0f4eb0ad604b0052b97c253f";
export const facebookRedirectUri = "http://localhost:3000/oauth/facebook";
export const facebookScope = "email public_profile";

export function getGoogleAuthUrl({
  clientId,
  redirectUri,
  scope,
  state,
  responseType = "code",
  codeChallenge,
  prompt = "consent",
  accessType = "offline",
  codeChallengeMethod = "S256",
}) {
  // Construct the base URL with required query parameters
  const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scope,
    state: state,
    response_type: responseType,
    prompt: prompt,
    access_type: accessType,
    code_challenge: codeChallenge,
    code_challenge_method: codeChallengeMethod,
  });

  // Return the full authentication URL
  return `${baseUrl}?${params.toString()}`;
}

export function generateCodeVerifier() {
  // The code verifier should be between 43 and 128 characters long
  const codeVerifier = generateRandomString(43);
  sessionStorage.setItem("codeVerifier", codeVerifier);
  return codeVerifier;
}

export function generateCodeChallenge(codeVerifier) {
  const shaObj = new jsSHA("SHA-256", "TEXT");
  shaObj.update(codeVerifier);
  const hash = shaObj.getHash("HEX");
  return base64urlencode(hash);
}

export function generateRandomStateValue() {
  // Replace this with your method of generating a random string
  return Math.random().toString(36).substring(2, 15);
}

// You might need to use a more secure random generator for production code
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getFacebookAuthUrl({
  facebookAppId,
  facebookRedirectUri,
  state,
  facebookScope,
  codeChallenge,
  responseType = "code",
  codeChallengeMethod = "S256",
}) {
  // Construct the base URL with required query parameters
  const baseUrl = "https://www.facebook.com/v18.0/dialog/oauth";
  const params = new URLSearchParams({
    client_id: facebookAppId,
    redirect_uri: facebookRedirectUri,
    state: state,
    scope: facebookScope,
    response_type: responseType,
    code_challenge: codeChallenge,
    code_challenge_method: codeChallengeMethod,
  });

  // Return the full authentication URL
  return `${baseUrl}?${params.toString()}`;
}

// Helper function to Base64URL encode a string
function base64urlencode(str) {
  // Convert the hex string to a Base64 string
  const base64 = btoa(
    String.fromCharCode.apply(
      null,
      str.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
    )
  );
  // Replace non-URL-safe characters with their URL-safe equivalents
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
