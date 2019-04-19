import status from '../../status';
import ServerError from '../ServerError';
import { ErrorOptions } from '../HTTPError';

class GatewayTimeoutError extends ServerError {
  constructor(message: string = status.codes[status.GATEWAY_TIMEOUT], options: ErrorOptions = { expose: false }) {
    super(status.GATEWAY_TIMEOUT, message, options);
  }
}

export default GatewayTimeoutError;
