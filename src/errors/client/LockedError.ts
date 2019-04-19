import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class LockedError extends ClientError {
  constructor(message: string = status.codes[status.LOCKED], options: ErrorOptions = { expose: true }) {
    super(status.LOCKED, message, options);
  }
}

export default LockedError;
