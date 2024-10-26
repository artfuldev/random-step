import { pipe } from 'fp-ts/lib/function';
import { EMPTY, from, map } from 'rxjs';
import { author, name, repository, version } from '../../package.json';
import * as P from '../parser';
import type { Sinks } from '../sinks';

export type Identify = ['identify'];
const Identify: Identify = ['identify'];

export const parse = pipe(
  P.token('identify'),
  P.map(() => Identify),
);

export const identify = (_: Identify): Sinks => {
  return {
    stderr: EMPTY,
    exit: EMPTY,
    stdout: from([
      `name ${name}`,
      `author ${author}`,
      `version ${version}`,
      `url ${repository.url}`,
      'ok',
    ]).pipe(map((str) => `identify ${str}`)),
  };
};
