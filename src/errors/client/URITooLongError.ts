import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class URITooLargeError extends ClientError {
  constructor(message: string = status.codes[status.URI_TOO_LONG], options: ErrorOptions = { expose: true }) {
    super(status.URI_TOO_LONG, message, options);
  }
}

export default URITooLargeError;
