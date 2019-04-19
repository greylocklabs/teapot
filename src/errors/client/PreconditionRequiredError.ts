import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class PreconditionRequiredError extends ClientError {
  constructor(message: string = status.codes[status.PRECONDITION_REQUIRED], options: ErrorOptions = { expose: true }) {
    super(status.PRECONDITION_REQUIRED, message, options);
  }
}

export default PreconditionRequiredError;
