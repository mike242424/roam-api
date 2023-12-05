import { JwtPayload } from 'jsonwebtoken';

interface MyJwtPayload extends JwtPayload {
  _id: string;
}

export default MyJwtPayload;
