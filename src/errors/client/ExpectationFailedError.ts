import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class ExpectationFailedError extends ClientError {
  constructor(message: string = status.codes[status.EXPECTATION_FAILED], options: ErrorOptions = { expose: true }) {
    super(status.EXPECTATION_FAILED, message, options);
  }
}

export default ExpectationFailedError;
