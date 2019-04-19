import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class PayloadTooLargeError extends ClientError {
  constructor(message: string = status.codes[status.PAYLOAD_TOO_LARGE], options: ErrorOptions = { expose: true }) {
    super(status.PAYLOAD_TOO_LARGE, message, options);
  }
}

export default PayloadTooLargeError;
