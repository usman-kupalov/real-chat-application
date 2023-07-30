import { NotFoundError } from '../errors/not.found.js';

const errorHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) return res.status(err.statusError).json(err.message);

  console.error(err);
  res.status(500).json(err.message);
};

export { errorHandler };
