import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class LengthRequiredError extends ClientError {
  constructor(message: string = status.codes[status.LENGTH_REQUIRED], options: ErrorOptions = { expose: true }) {
    super(status.LENGTH_REQUIRED, message, options);
  }
}

export default LengthRequiredError;
