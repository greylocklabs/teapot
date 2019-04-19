import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class ForbiddenError extends ClientError {
  constructor(message: string = status.codes[status.FORBIDDEN], options: ErrorOptions = { expose: true }) {
    super(status.FORBIDDEN, message, options);
  }
}

export default ForbiddenError;
