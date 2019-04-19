import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class BadRequestError extends ClientError {
  constructor(message: string = status.codes[status.BAD_REQUEST], options: ErrorOptions = { expose: true }) {
    super(status.BAD_REQUEST, message, options);
  }
}

export default BadRequestError;
