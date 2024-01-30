import { STATUS_UNAUTHORIZED } from '../utils/consts';

class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message); // передаем сообщение родительскому классу Error
    this.statusCode = STATUS_UNAUTHORIZED;

    // Устанавливаем прототип экземпляра вручную, так как в ES6 классах прототип может теряться
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export default UnauthorizedError;
