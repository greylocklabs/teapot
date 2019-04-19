import status from '../../status';
import ServerError from '../ServerError';
import { ErrorOptions } from '../HTTPError';

class InsufficientStorageError extends ServerError {
  constructor(message: string = status.codes[status.INSUFFICIENT_STORAGE], options: ErrorOptions = { expose: false }) {
    super(status.INSUFFICIENT_STORAGE, message, options);
  }
}

export default InsufficientStorageError;
