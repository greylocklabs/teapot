import status from '../../status';
import ServerError from '../ServerError';
import { ErrorOptions } from '../HTTPError';

class BadGatewayError extends ServerError {
  constructor(message: string = status.codes[status.BAD_GATEWAY], options: ErrorOptions = { expose: false }) {
    super(status.BAD_GATEWAY, message, options);
  }
}

export default BadGatewayError;
