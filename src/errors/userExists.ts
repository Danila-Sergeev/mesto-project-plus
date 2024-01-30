import { STATUS_USER_EXISTS } from '../utils/consts';

class UserExistsError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message); // передаем сообщение родительскому классу Error
    this.statusCode = STATUS_USER_EXISTS;

    // Устанавливаем прототип экземпляра вручную, так как в ES6 классах прототип может теряться
    Object.setPrototypeOf(this, UserExistsError.prototype);
  }
}

export default UserExistsError;
