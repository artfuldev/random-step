import { ParseResult } from '.';
import type { Parser } from './parser';

export const map =
  <T, R>(f: (arg: T) => R) =>
  (parser: Parser<T>): Parser<R> =>
  (str: string) =>
    ParseResult.match<T, ParseResult<R>>({
      success: (parsed, remaining) => ParseResult.Success(f(parsed), remaining),
      failure: (reason) => ParseResult.Failure(reason),
    })(parser(str));
