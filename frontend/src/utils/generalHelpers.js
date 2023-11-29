export function formatPhoneNumber(phoneNumber) {
  // Check if phoneNumber is valid

  const phoneStr = String(phoneNumber).replace(/[^\d]/g, "");

  if (!phoneStr || phoneStr.length !== 11) {
    throw new Error("Invalid phone number");
  }

  // Format the phone number
  return `+${phoneStr.slice(0, 2)} ${phoneStr.slice(2, 4)} ${phoneStr.slice(
    4,
    7
  )} ${phoneStr.slice(7, 9)} ${phoneStr.slice(9, 11)}`;
}

export function splitAddressesByType(addresses) {
  const shippingAddresses = addresses.filter(
    (address) => address.type === "Shipping" || address.type === "Both"
  );
  const billingAddresses = addresses.filter(
    (address) => address.type === "Billing" || address.type === "Both"
  );

  return { shippingAddresses, billingAddresses };
}
