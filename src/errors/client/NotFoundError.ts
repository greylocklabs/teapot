import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class NotFoundError extends ClientError {
  constructor(message: string = status.codes[status.NOT_FOUND], options: ErrorOptions = { expose: true }) {
    super(status.NOT_FOUND, message, options);
  }
}

export default NotFoundError;
