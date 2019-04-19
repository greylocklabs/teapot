import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class MisdirectedRequestError extends ClientError {
  constructor(message: string = status.codes[status.MISDIRECTED_REQUEST], options: ErrorOptions = { expose: true }) {
    super(status.MISDIRECTED_REQUEST, message, options);
  }
}

export default MisdirectedRequestError;
