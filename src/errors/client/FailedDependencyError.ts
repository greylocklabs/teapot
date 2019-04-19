import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class FailedDependencyError extends ClientError {
  constructor(message: string = status.codes[status.FAILED_DEPENDENCY], options: ErrorOptions = { expose: true }) {
    super(status.FAILED_DEPENDENCY, message, options);
  }
}

export default FailedDependencyError;
