import { ParseResult } from "./parse-result";
import type { Parser } from "./parser";

type Combined<A extends any[]> = {
  readonly [I in keyof A]: Parser<A[I]>;
};

type Union<A extends any[]> = A[number];

export const or =
  <T extends any[]>(...parsers: Combined<[...T]>): Parser<Union<T>> =>
  (str: string) => {
    const reasons = [];
    for (const parser of parsers) {
      const result = parser(str);
      if (result.type === "success") {
        return result;
      } else {
        reasons.push(result.reason);
      }
    }
    return ParseResult.Failure(reasons.join(" or "));
  };
