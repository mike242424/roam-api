import bcrypt from 'bcrypt';

// Function to hash a password
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, process.env.SALT);
};
