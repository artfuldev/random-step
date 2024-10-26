import type { Observable } from "rxjs";

export type Sinks = {
  stdout: Observable<string>;
  stderr: Observable<string>;
  exit: Observable<number>;
};
