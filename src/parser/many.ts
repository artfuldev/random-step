import { ParseResult } from './parse-result';
import type { Parser } from './parser';

export const many =
  <T>(parser: Parser<T>): Parser<T[]> =>
  (str: string) => {
    const results: T[] = [];
    let remaining = str;
    let result = parser(remaining);
    while (result.type === 'success') {
      results.push(result.parsed);
      remaining = result.remaining;
      result = parser(remaining);
    }
    return ParseResult.Success(results, remaining);
  };
