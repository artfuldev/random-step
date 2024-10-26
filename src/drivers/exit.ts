import type { Observable } from 'rxjs';

export const exit = (code$: Observable<number>) => {
  code$.subscribe((code) => process.exit(code));
};
