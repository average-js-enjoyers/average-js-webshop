export const isEmailValid = (email) => {
  const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export const passwordValidationErrors = (password) => {
  const errors = [];

  // Check for minimum length
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }

  // Check for lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }

  // Check for uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }

  // Check for a digit
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one digit.");
  }

  return errors;
};

// Checks if phone number has at least 11 digits. A plus sign is allowed at the beginning.
export const isPhoneNumberValid = (phoneNumber) => {
  // Updated regex: allows optional spaces between digits and at least 10 digits in total
  const re = /^\+?(\d\s*){10,}$/;
  return re.test(String(phoneNumber).replace(/\s+/g, " ")); // Replace multiple spaces with a single space
};
