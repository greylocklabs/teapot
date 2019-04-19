import status from '../../status';
import ServerError from '../ServerError';
import { ErrorOptions } from '../HTTPError';

class InternalServerError extends ServerError {
  constructor(message: string = status.codes[status.INTERNAL_SERVER_ERROR], options: ErrorOptions = { expose: false }) {
    super(status.INTERNAL_SERVER_ERROR, message, options);
  }
}

export default InternalServerError;
