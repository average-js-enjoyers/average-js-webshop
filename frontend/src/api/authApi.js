//src/api/authApi.js
import { isEmailValid } from "utils/validators";

export async function createUser(user) {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = response.json();

    // TODO - Remove console.log
    if (!!data) console.log("User created successfully!");

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user");
  }
}

//Need to find the user somehow
export async function onboardUser(user) {
  try {
    const response = await fetch("/api/users/me/onboard", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to onboard user");
  }
}

export async function doesEmailExist(email) {
  try {
    const response = await fetch("/api/auth/email/exists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
    const data = await response.json();
    return data.data.exists;
  } catch (error) {
    console.error(error);
  }
}

export const isUserRegistered = async (email) => {
  if (isEmailValid(email)) {
    try {
      const response = await fetch("DONTLEAVEMEHERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.exists;
      } else {
        throw new Error("Failed to fetch email check");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
};

export function signIn(user) {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
}

export function modifyUser(user) {
  return "I am modifying the user 🪄";
}

export async function fetchUserInfoAndGetNewToken(authServer, accessToken) {
  // Here would be an HTTP call to your backend with the accessToken

  //  This is how the call should include the Authorization header
  // TODO - Remove accessToken from the query after backend implementation
  const response = await fetch(`/api/auth/login/${authServer}/${accessToken}`, {
    method: "POST", // Specify the method
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken }),
  });
  const res = await response.json();

  sessionStorage.setItem("accessToken", res.token);

  return res.data.user;
}

export async function checkEmailExists(email) {
  try {
    const response = await fetch("/api/auth/email/exists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
    const data = await response.json();
    return data.data.exists;
  } catch (error) {
    console.error(error);
  }
}
