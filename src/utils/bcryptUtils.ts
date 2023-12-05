import bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, process.env.SALT);
};

export default hashPassword;
