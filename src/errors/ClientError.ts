import status from '../status';

import HTTPError, { ErrorOptions } from './HTTPError';

class ClientError extends HTTPError {
  constructor(code: number, message: string, options: ErrorOptions = { expose: true }) {
    super(code, message, options);

    if (!status.isClientError(code)) throw new Error(`Invalid status code ${code} - must be 4xx`);
  }
}

export default ClientError;
