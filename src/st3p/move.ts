import { pipe } from "fp-ts/lib/function";
import * as P from "../parser";
import * as T from "../t3en";
import { best } from "../core/best";
import type { Sinks } from "../sinks";
import { EMPTY, catchError, filter, from, map, of } from "rxjs";

type Infinite = ["infinite"];
const Infinite: Infinite = ["infinite"];
type Milliseconds = number;
type TimePerMove = ["time-per-move", Milliseconds];
const TimePerMove = (milliseconds: Milliseconds): TimePerMove => [
  "time-per-move",
  milliseconds,
];
type TimeRemaining = ["time-remaining", Milliseconds];
const TimeRemaining = (milliseconds: Milliseconds): TimeRemaining => [
  "time-remaining",
  milliseconds,
];
export type Move = ["move", T.State, Infinite | TimePerMove | TimeRemaining];
const Move = (
  state: T.State,
  time: Infinite | TimePerMove | TimeRemaining
): Move => ["move", state, time];

export const parse = pipe(
  P.and(
    P.token("move"),
    P.one_or_more(P.whitespace),
    T.parse,
    P.or(
      pipe(
        P.and(
          P.one_or_more(P.whitespace),
          P.token("time-remaining"),
          P.one_or_more(P.whitespace),
          P.and(P.token("ms:"), P.non_zero_positive_integer)
        ),
        P.map(([, , , [, milliseconds]]) => TimeRemaining(milliseconds))
      ),
      pipe(
        P.and(
          P.one_or_more(P.whitespace),
          P.token("time"),
          P.one_or_more(P.whitespace),
          P.and(P.token("ms:"), P.non_zero_positive_integer)
        ),
        P.map(([, , , [, milliseconds]]) => TimePerMove(milliseconds))
      ),
      pipe(
        P.any,
        P.map(() => Infinite)
      )
    )
  ),
  P.map(([, , state, time]) => Move(state, time))
);

const column = (index: number) => {
  let result = "";
  do {
    let remainder = index % 26;
    result = String.fromCharCode(97 + remainder) + result;
    index = Math.floor(index / 26) - 1;
  } while (index >= 0);

  return result;
};

export const move = ([, [board]]: Move): Sinks => {
  const best$ = from(best(board)).pipe(
    map(([x, y]) => `best ${column(y)}${x + 1}`)
  );
  return {
    stderr: best$.pipe(
      filter(() => false),
      catchError((err) => of((err as Error).message))
    ),
    stdout: best$,
    exit: EMPTY,
  };
};
