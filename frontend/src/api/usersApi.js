export async function createUser(user) {
  try {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user");
  }
}

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
