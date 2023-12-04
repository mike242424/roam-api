import { Response } from 'express';

const handleErrors = (
  res: Response,
  statusCode: number,
  message: string,
): void => {
  res.status(statusCode).json({ message });
};

export default handleErrors;
