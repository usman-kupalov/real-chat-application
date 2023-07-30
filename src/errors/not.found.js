class NotFoundError extends Error {
  constructor() {
    super();
    this.message = 'Not found',
    this.name = NotFoundError.name;
    this.statusError = 404;
  }
}

export { NotFoundError };
