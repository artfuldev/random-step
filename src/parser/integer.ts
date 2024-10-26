import { pipe } from "fp-ts/lib/function";
import type { Parser } from "./parser";
import { and } from "./and";
import { many } from "./many";
import { non_zero_digit } from "./non-zero-digit";
import { digit } from "./digit";
import { map } from "./map";

export const non_zero_positive_integer: Parser<number> = pipe(
  and(non_zero_digit, many(digit)),
  map(([first, rest]) => [first, ...rest].join("")),
  map(Number)
);
