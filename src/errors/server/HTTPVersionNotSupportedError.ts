import status from '../../status';
import ServerError from '../ServerError';
import { ErrorOptions } from '../HTTPError';

class HTTPVersionNotSupportedError extends ServerError {
  constructor(
    message: string = status.codes[status.HTTP_VERSION_NOT_SUPPORTED],
    options: ErrorOptions = { expose: false },
  ) {
    super(status.HTTP_VERSION_NOT_SUPPORTED, message, options);
  }
}

export default HTTPVersionNotSupportedError;
