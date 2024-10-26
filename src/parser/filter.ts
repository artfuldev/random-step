import { type Option, map, getOrElse } from "fp-ts/lib/Option";
import type { Parser } from "./parser";
import { ParseResult } from "./parse-result";

export const filter =
  <A>(reason: (a: A) => Option<string>) =>
  (parser: Parser<A>): Parser<A> =>
  (str: string) =>
    ParseResult.match<A, ParseResult<A>>({
      success: (parsed, remaining) =>
        getOrElse(() => ParseResult.Success<A>(parsed, remaining))(
          map((x: string) => ParseResult.Failure<A>(x))(reason(parsed))
        ),
      failure: (reason) => ParseResult.Failure(reason),
    })(parser(str));
