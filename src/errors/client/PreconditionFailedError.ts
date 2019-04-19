import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class PreconditionFailedError extends ClientError {
  constructor(message: string = status.codes[status.PRECONDITION_FAILED], options: ErrorOptions = { expose: true }) {
    super(status.PRECONDITION_FAILED, message, options);
  }
}

export default PreconditionFailedError;
