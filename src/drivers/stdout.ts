import type { Observable } from "rxjs";

export const stdout = (out$: Observable<string>) => {
  out$.subscribe((line) => console.log(line));
};
