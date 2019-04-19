import status from '../../status';
import ClientError from '../ClientError';
import { ErrorOptions } from '../HTTPError';

class UpgradeRequiredError extends ClientError {
  constructor(message: string = status.codes[status.UPGRADE_REQUIRED], options: ErrorOptions = { expose: true }) {
    super(status.UPGRADE_REQUIRED, message, options);
  }
}

export default UpgradeRequiredError;
