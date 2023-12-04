import { Request } from 'express';
import UserInterface from './userInterface';

interface RequestWithUserInterface extends Request {
  user: UserInterface;
}

export default RequestWithUserInterface;
