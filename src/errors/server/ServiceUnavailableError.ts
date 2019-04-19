import status from '../../status';
import ServerError from '../ServerError';
import { ErrorOptions } from '../HTTPError';

class ServiceUnavailableError extends ServerError {
  constructor(message: string = status.codes[status.SERVICE_UNAVAILABLE], options: ErrorOptions = { expose: false }) {
    super(status.SERVICE_UNAVAILABLE, message, options);
  }
}

export default ServiceUnavailableError;
