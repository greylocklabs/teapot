import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class UnorderedCollectionError extends ClientError {
  constructor(message: string = status.codes[status.UNORDERED_COLLECTION], options: ErrorOptions = { expose: true }) {
    super(status.UNORDERED_COLLECTION, message, options);
  }
}

export default UnorderedCollectionError;
