import { EMPTY, of } from "rxjs";
import * as P from "../parser";
import type { Sinks } from "../sinks";

export type Quit = ["quit"];

export const Quit: Quit = ["quit"];

export const parse = P.map(() => Quit)(P.token("quit"));

export const quit = (_: Quit): Sinks => {
  return {
    stderr: EMPTY,
    stdout: EMPTY,
    exit: of(0),
  };
};
