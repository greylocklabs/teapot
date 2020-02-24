import status from '../../status';
import ServerError from '../ServerError';
import { ErrorOptions } from '../HTTPError';

class NetworkAuthenticationRequiredError extends ServerError {
  constructor(
    message: string = status.codes[status.NETWORK_AUTHENTICATION_REQUIRED],
    options: ErrorOptions = { expose: false },
  ) {
    super(status.NETWORK_AUTHENTICATION_REQUIRED, message, options);
  }
}

export default NetworkAuthenticationRequiredError;
