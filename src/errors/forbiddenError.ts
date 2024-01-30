import { STATUS_FORBIDDEN } from '../utils/consts';

class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message); // передаем сообщение родительскому классу Error
    this.statusCode = STATUS_FORBIDDEN;

    // Устанавливаем прототип экземпляра вручную, так как в ES6 классах прототип может теряться
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export default ForbiddenError;
