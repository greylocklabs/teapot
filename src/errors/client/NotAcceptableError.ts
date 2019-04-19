import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class NotAcceptableError extends ClientError {
  constructor(message: string = status.codes[status.NOT_ACCEPTABLE], options: ErrorOptions = { expose: true }) {
    super(status.NOT_ACCEPTABLE, message, options);
  }
}

export default NotAcceptableError;
