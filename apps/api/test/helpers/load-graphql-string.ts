import { readFileSync } from 'fs';
import { join } from 'path';

export const loadGraphQLString = (module: string, fileName: string) => {
  return readFileSync(
    join(process.cwd(), 'test', 'graphql', module, `${fileName}.graphql`),
  ).toString();
};
