import { ParseResult } from './parse-result';
import type { Parser } from './parser';

export const token =
  <T extends string>(token: T): Parser<T> =>
  (str: string) => {
    if (str.startsWith(token))
      return ParseResult.Success(token, str.slice(token.length));
    return ParseResult.Failure(`Expected token ${token}`);
  };
