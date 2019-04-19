import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class ImATeapotError extends ClientError {
  constructor(message: string = status.codes[status.IM_A_TEAPOT], options: ErrorOptions = { expose: true }) {
    super(status.IM_A_TEAPOT, message, options);
  }
}

export default ImATeapotError;
