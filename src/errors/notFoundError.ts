class NotFoundError extends Error {
  constructor(message?: string) {
    super(message); // передаем сообщение в базовый класс
    this.name = 'NotFoundError'; // задаем имя ошибки
    // eslint-disable-next-line no-console
    // правильно устанавливаем прототип (необходимо для `instanceof` в TypeScript)
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export default NotFoundError;
