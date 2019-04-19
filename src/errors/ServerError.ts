import status from '../status';

import HTTPError, { ErrorOptions } from './HTTPError';

class ServerError extends HTTPError {
  constructor(code: number, message: string, options: ErrorOptions) {
    super(code, message, options);

    if (!status.isServerError(code)) throw new Error(`Invalid status code ${code} - must be 5xx`);
  }
}

export default ServerError;
