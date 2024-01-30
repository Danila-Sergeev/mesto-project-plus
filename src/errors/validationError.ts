import { STATUS_BAD_REQUEST } from '../utils/consts';

class ValidationError extends Error {
  statusCode: number;

  // eslint-disable-next-line no-unused-vars
  constructor(message: string, public details: any) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = STATUS_BAD_REQUEST;
  }
}

export default ValidationError;
