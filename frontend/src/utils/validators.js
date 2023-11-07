export const isEmailValid = (email) => {
  const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export const isPasswordValid = (password) => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordPattern.test(password);
};
