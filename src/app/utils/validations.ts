export const validateEmail = (email: string): boolean => {
  const regex = /^\S+@\S+\.\S+$/;
  return email.length >= 5 && regex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;
  return password.length >= 8 && regex.test(password);
};
