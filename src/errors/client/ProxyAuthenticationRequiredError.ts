import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class ProxyAuthenticationRequiredError extends ClientError {
  constructor(
    message: string = status.codes[status.PROXY_AUTHENTICATION_REQUIRED],
    options: ErrorOptions = { expose: true }
  ) {
    super(status.PROXY_AUTHENTICATION_REQUIRED, message, options);
  }
}

export default ProxyAuthenticationRequiredError;
