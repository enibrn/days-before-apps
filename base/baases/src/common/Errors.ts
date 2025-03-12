import { AppwriteException } from 'appwrite';

export class ErrorsUtils {
  static parseError(err: unknown): ParsedError {
    if (err instanceof ParsedError)
      return err; // already parsed

    console.error(err);

    if (err instanceof AppwriteException) {
      const appwriteError = err as AppwriteException;

      if (appwriteError.type === 'general_argument_invalid') {
        return parseAppwriteInvalidArg(appwriteError);
      } else {
        return ParsedError.createWithOtherErrorMessage(appwriteError.message);
      }
    } else if (err instanceof Error) {
      const error = err as Error;
      return ParsedError.createWithOtherErrorMessage(error.message);
    }

    return ParsedError.createWithOtherErrorMessage('An unknown error occurred.');

    function parseAppwriteInvalidArg(appwriteError: AppwriteException): ParsedError {
      try {
        const error = appwriteError.message.split('`');
        const field = error[1];
        const message = error[2].split(': ')[1];
        return ParsedError.createWithFieldError(field, message);
      } catch (error) {
        return ParsedError.createWithOtherErrorMessage(appwriteError.message);
      }
    }
  }
}

export class ParsedError {
  otherErrorMessage: string | null;
  errors: { [field: string]: string; };

  constructor() {
    this.otherErrorMessage = null;
    this.errors = {};
  }

  static createWithFieldError(field: string, message: string): ParsedError {
    const parsedError = new ParsedError();
    parsedError.addError(field, message);
    return parsedError;
  }

  static createWithOtherErrorMessage(message: string): ParsedError {
    const parsedError = new ParsedError();
    parsedError.otherErrorMessage = message;
    return parsedError;
  }

  addError(field: string, message: string) {
    this.errors[field] = message;
  }

  hasErrors() {
    return Object.keys(this.errors).length > 0 || this.otherErrorMessage !== null;
  }
}
