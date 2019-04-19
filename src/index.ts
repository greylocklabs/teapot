import status, { Status } from './status';
import * as errors from './errors';
import { ErrorOptions } from './errors/HTTPError';

const map = new Map();

for (const error in errors) {
  const Err = (errors as any)[error];
  const proto = Err.prototype;

  if (proto instanceof errors.ClientError || proto instanceof errors.ServerError) {
    const err = new Err();
    map.set(err.code, Err);
  }
}

const teapot = {
  ...errors,
  status: status as Status,
  error: (code: string | number, message?: string, options?: ErrorOptions): errors.HTTPError => {
    if (!status.isError(code)) throw new Error(`Invalid status code ${code} - must be 4xx or 5xx`);

    const ErrorClass = map.get(status.code(code));
    return new ErrorClass(message, options);
  },
};

export default teapot;
