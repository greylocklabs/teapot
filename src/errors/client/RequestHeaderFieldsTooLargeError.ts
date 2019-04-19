import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class RequestHeaderFieldsTooLargeError extends ClientError {
  constructor(
    message: string = status.codes[status.REQUEST_HEADER_FIELDS_TOO_LARGE],
    options: ErrorOptions = { expose: true }
  ) {
    super(status.REQUEST_HEADER_FIELDS_TOO_LARGE, message, options);
  }
}

export default RequestHeaderFieldsTooLargeError;
