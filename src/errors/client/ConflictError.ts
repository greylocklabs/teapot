import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class ConflictError extends ClientError {
  constructor(message: string = status.codes[status.CONFLICT], options: ErrorOptions = { expose: true }) {
    super(status.CONFLICT, message, options);
  }
}

export default ConflictError;
