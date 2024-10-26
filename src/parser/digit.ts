import { ParseResult } from "./parse-result";
import type { Parser } from "./parser";

export type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
const digits = new Set("0123456789".split("") as Array<Digit>);

export const digit: Parser<Digit> = (str: string) => {
  const first = str[0] as Digit;
  return digits.has(first)
    ? ParseResult.Success(first, str.slice(1))
    : ParseResult.Failure("Expected digit from 0-9");
};
