import status from '../../status';
import ServerError from '../ServerError';
import { ErrorOptions } from '../HTTPError';

class NotImplementedError extends ServerError {
  constructor(message: string = status.codes[status.NOT_IMPLEMENTED], options: ErrorOptions = { expose: false }) {
    super(status.NOT_IMPLEMENTED, message, options);
  }
}

export default NotImplementedError;
