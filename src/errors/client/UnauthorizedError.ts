import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class UnauthorizedError extends ClientError {
  constructor(message: string = status.codes[status.UNAUTHORIZED], options: ErrorOptions = { expose: true }) {
    super(status.UNAUTHORIZED, message, options);
  }
}

export default UnauthorizedError;
