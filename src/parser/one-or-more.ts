import { pipe } from "fp-ts/lib/function";
import type { Parser } from "./parser";
import { map } from "./map";
import { and } from "./and";
import { many } from "./many";

export const one_or_more = <T>(parser: Parser<T>): Parser<T[]> =>
  pipe(
    and(parser, many(parser)),
    map(([first, rest]) => [first, ...rest])
  );
