import status from '../../status';
import ServerError from '../ServerError';
import { ErrorOptions } from '../HTTPError';

class NotExtendedError extends ServerError {
  constructor(message: string = status.codes[status.NOT_EXTENDED], options: ErrorOptions = { expose: false }) {
    super(status.NOT_EXTENDED, message, options);
  }
}

export default NotExtendedError;
