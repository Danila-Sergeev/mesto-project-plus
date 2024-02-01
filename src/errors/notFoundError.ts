import { STATUS_NOT_FOUND } from '../utils/consts';

class NotFoundError extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = STATUS_NOT_FOUND;

    // правильно устанавливаем прототип (необходимо для `instanceof` в TypeScript)
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export default NotFoundError;
