import status from '../../status';
import ServerError from '../ServerError';
import { ErrorOptions } from '../HTTPError';

class LoopDetectedError extends ServerError {
  constructor(message: string = status.codes[status.LOOP_DETECTED], options: ErrorOptions = { expose: false }) {
    super(status.LOOP_DETECTED, message, options);
  }
}

export default LoopDetectedError;
