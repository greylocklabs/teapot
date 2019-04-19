import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class UnprocessableEntityError extends ClientError {
  constructor(message: string = status.codes[status.UNPROCESSABLE_ENTITY], options: ErrorOptions = { expose: true }) {
    super(status.UNPROCESSABLE_ENTITY, message, options);
  }
}

export default UnprocessableEntityError;
