import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class UnsupportedMediaTypeError extends ClientError {
  constructor(message: string = status.codes[status.UNSUPPORTED_MEDIA_TYPE], options: ErrorOptions = { expose: true }) {
    super(status.UNSUPPORTED_MEDIA_TYPE, message, options);
  }
}

export default UnsupportedMediaTypeError;
