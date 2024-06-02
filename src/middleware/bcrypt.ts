import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const hashCompare = async (
  passwordBody: string,
  user_password: string
) => {
  return await bcrypt.compare(user_password, passwordBody);
};
