import { Document } from 'mongoose'; // Import the appropriate type from mongoose

declare global {
  namespace Express {
    interface Request {
      userData?: Document;
    }
  }
}
