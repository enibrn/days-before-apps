import { ParsedError } from 'baases';

export function useErrorMgmt() {
  function alertError(error: ParsedError) {
    alert(error.printErrors());
  }

  return { alertError };
}