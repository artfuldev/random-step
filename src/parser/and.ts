import { ParseResult } from './parse-result';
import type { Parser } from './parser';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Combined<A extends any[]> = {
  readonly [I in keyof A]: Parser<A[I]>;
};

export const and =
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    <T extends any[]>(...parsers: Combined<[...T]>): Parser<T> =>
    (str: string) => {
      let remaining = str;
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const results: T = [] as any;
      for (const parser of parsers) {
        const result = parser(remaining);
        if (result.type === 'failure') {
          return ParseResult.Failure(result.reason);
        }
        results.push(result.parsed);
        remaining = result.remaining;
      }
      return ParseResult.Success(results, remaining);
    };
