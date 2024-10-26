import { ParseResult } from "./parse-result";
import type { Parser } from "./parser";

export const any: Parser<undefined> = (str: string) => {
  return ParseResult.Success(undefined, str);
};
