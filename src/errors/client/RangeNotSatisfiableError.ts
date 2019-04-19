import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class RangeNotSatisfiableError extends ClientError {
  constructor(message: string = status.codes[status.RANGE_NOT_SATISFIABLE], options: ErrorOptions = { expose: true }) {
    super(status.RANGE_NOT_SATISFIABLE, message, options);
  }
}

export default RangeNotSatisfiableError;
