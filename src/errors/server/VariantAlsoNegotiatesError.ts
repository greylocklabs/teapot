import status from '../../status';
import ServerError from '../ServerError';
import { ErrorOptions } from '../HTTPError';

class VariantAlsoNegotiatesError extends ServerError {
  constructor(
    message: string = status.codes[status.VARIANT_ALSO_NEGOTIATES],
    options: ErrorOptions = { expose: false },
  ) {
    super(status.VARIANT_ALSO_NEGOTIATES, message, options);
  }
}

export default VariantAlsoNegotiatesError;
