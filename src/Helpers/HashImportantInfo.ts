import bcrypt from "bcrypt";

export const hashImportantInfo = async (code: string) => {
  const salt = await bcrypt.genSalt();
  const hashedCode = await bcrypt.hash(code, salt);

  return hashedCode;
};
