//src/api/usersApi.js

export async function apiFetchUserAddresses() {
  try {
    const response = await fetch("/api/user/profile/address", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });

    // Await the resolution of the promise returned by response.json()
    const data = await response.json();
    return data.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user addresses");
  }
}

export async function apiUpdateUserInfo(user) {
  try {
    const response = await fetch("/api/user/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update user info");
  }
}

export async function apiUpdateUserPassword(passwords) {
  try {
    const response = await fetch("/api/user/profile/password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(passwords),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update user password");
  }
}

export async function apiAddAddress(address) {
  try {
    const response = await fetch("/api/user/profile/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken2")}`,
      },
      body: JSON.stringify(address),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add address");
  }
}
