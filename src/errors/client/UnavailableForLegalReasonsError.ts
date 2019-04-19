import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class UnavailableForLegalReasonsError extends ClientError {
  constructor(
    message: string = status.codes[status.UNAVAILABLE_FOR_LEGAL_REASONS],
    options: ErrorOptions = { expose: true }
  ) {
    super(status.UNAVAILABLE_FOR_LEGAL_REASONS, message, options);
  }
}

export default UnavailableForLegalReasonsError;
