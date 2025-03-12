import { ParsedError } from './Errors';

export type BaasConfigs = {
  endpointUrl: string;
  projectKey: string;
}; 

export type OperationResult = {
  error: ParsedError | null;
};