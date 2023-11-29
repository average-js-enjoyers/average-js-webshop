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
