import * as P from "../parser";
import { name, author, version, repository } from "../../package.json";
import { pipe } from "fp-ts/lib/function";
import type { Sinks } from "../sinks";
import { EMPTY, from, map } from "rxjs";

export type Identify = ["identify"];
const Identify: Identify = ["identify"];

export const parse = pipe(
  P.token("identify"),
  P.map(() => Identify)
);

export const identify = (_: Identify): Sinks => {
  return {
    stderr: EMPTY,
    exit: EMPTY,
    stdout: from([
      `name ${name}`,
      `author ${author}`,
      `version ${version}`,
      `url ${repository.url}`,
      "ok",
    ]).pipe(map((str) => `identify ${str}`)),
  };
};
