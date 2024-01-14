import { Result } from './result';

export interface UseCase<Params, Return> {
  execute(params: Params): Promise<Result<Return>> | Result<Return>;
}
