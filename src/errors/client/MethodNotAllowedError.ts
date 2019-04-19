import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class MethodNotAllowedError extends ClientError {
  constructor(message: string = status.codes[status.METHOD_NOT_ALLOWED], options: ErrorOptions = { expose: true }) {
    super(status.METHOD_NOT_ALLOWED, message, options);
  }
}

export default MethodNotAllowedError;
