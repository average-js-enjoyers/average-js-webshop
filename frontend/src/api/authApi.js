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

export async function fetchAccessToken(email, password) {
  try {
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailAddress: email, password }),
    });
    return await response.json();
  } catch (error) {
    // Handle or throw the error based on your use case
    console.error("Error in fetchAccessToken:", error);
    throw error; // Rethrow if you want the caller to handle it
  }
}

export async function fetchUserInfoAndGetNewToken(authServer, accessToken) {
  // Here would be an HTTP call to your backend with the accessToken

  //  This is how the call should include the Authorization header
  // TODO - Remove accessToken from the query after backend implementation
  const response = await fetch(`/api/auth/signin/${authServer}`, {
    method: "POST", // Specify the method
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: accessToken }),
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

export async function requestBackendToSendPasswordResetEmail(email) {
  try {
    const response = await fetch("/api/auth/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function sendConfirmationEmailRequest(email) {
  try {
    const response = await fetch("/api/auth/signin/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Confirmation-URL": "http://localhost:3000/onboard",
      },
      body: JSON.stringify({ emailAddress: email }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
