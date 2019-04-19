import status from '../../status';
import ServerError from '../ServerError';
import { ErrorOptions } from '../HTTPError';

class BandwidthLimitExceededError extends ServerError {
  constructor(
    message: string = status.codes[status.BANDWIDTH_LIMIT_EXCEEDED],
    options: ErrorOptions = { expose: false }
  ) {
    super(status.BANDWIDTH_LIMIT_EXCEEDED, message, options);
  }
}

export default BandwidthLimitExceededError;
