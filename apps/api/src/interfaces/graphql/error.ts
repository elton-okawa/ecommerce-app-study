import { GraphQLError } from 'graphql';

export enum ErrorCode {
  BUSINESS_ERROR = 'BUSINESS_ERROR',
}

export class GraphQLBusinessError extends GraphQLError {
  constructor(message: string) {
    super(message, { extensions: { code: ErrorCode.BUSINESS_ERROR, message } });
  }
}
