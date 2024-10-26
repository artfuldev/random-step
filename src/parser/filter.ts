import { type Option, getOrElse, map } from 'fp-ts/lib/Option';
import { ParseResult } from './parse-result';
import type { Parser } from './parser';

export const filter =
  <A>(reason: (a: A) => Option<string>) =>
  (parser: Parser<A>): Parser<A> =>
  (str: string) =>
    ParseResult.match<A, ParseResult<A>>({
      success: (parsed, remaining) =>
        getOrElse(() => ParseResult.Success<A>(parsed, remaining))(
          map((x: string) => ParseResult.Failure<A>(x))(reason(parsed)),
        ),
      failure: (reason) => ParseResult.Failure(reason),
    })(parser(str));
