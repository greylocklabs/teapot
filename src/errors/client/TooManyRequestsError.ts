import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class TooManyRequestsError extends ClientError {
  constructor(message: string = status.codes[status.TOO_MANY_REQUESTS], options: ErrorOptions = { expose: true }) {
    super(status.TOO_MANY_REQUESTS, message, options);
  }
}

export default TooManyRequestsError;
