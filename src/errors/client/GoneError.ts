import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class GoneError extends ClientError {
  constructor(message: string = status.codes[status.GONE], options: ErrorOptions = { expose: true }) {
    super(status.GONE, message, options);
  }
}

export default GoneError;
