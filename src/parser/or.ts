import { ParseResult } from './parse-result';
import type { Parser } from './parser';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Combined<A extends any[]> = {
  readonly [I in keyof A]: Parser<A[I]>;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Union<A extends any[]> = A[number];

export const or =
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    <T extends any[]>(...parsers: Combined<[...T]>): Parser<Union<T>> =>
    (str: string) => {
      const reasons = [];
      for (const parser of parsers) {
        const result = parser(str);
        if (result.type === 'success') {
          return result;
        }
        reasons.push(result.reason);
      }
      return ParseResult.Failure(reasons.join(' or '));
    };
