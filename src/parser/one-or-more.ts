import { pipe } from 'fp-ts/lib/function';
import { and } from './and';
import { many } from './many';
import { map } from './map';
import type { Parser } from './parser';

export const one_or_more = <T>(parser: Parser<T>): Parser<T[]> =>
  pipe(
    and(parser, many(parser)),
    map(([first, rest]) => [first, ...rest]),
  );
