import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class RequestTimeoutError extends ClientError {
  constructor(message: string = status.codes[status.REQUEST_TIMEOUT], options: ErrorOptions = { expose: true }) {
    super(status.REQUEST_TIMEOUT, message, options);
  }
}

export default RequestTimeoutError;
