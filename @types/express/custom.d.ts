import { ObjectId } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    // eslint-disable-next-line no-unused-vars
    interface Request {
      user?: string | JwtPayload | { _id: string | ObjectId; };
    }
  }
}
