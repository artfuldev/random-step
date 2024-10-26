import type { Observable } from 'rxjs';

export const stderr = (err$: Observable<string>) => {
  err$.subscribe((line) => console.error(line));
};
