//src/utils/oauthHelpers.js
import jsSHA from "jssha";

import oauthConfig from "utils/oauthConfig";

export function getAuthUrl(provider, state, codeChallenge) {
  const { clientId, redirectUri, scope, baseUrl } = oauthConfig[provider];

  const responseType = "code";
  const codeChallengeMethod = "S256";

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scope,
    state: state,
    response_type: responseType,
    code_challenge: codeChallenge,
    code_challenge_method: codeChallengeMethod,
  });

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
