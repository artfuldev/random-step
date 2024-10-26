import { createInterface } from 'node:readline';
import { type Observable, fromEvent } from 'rxjs';

type Sources = {
  line$: Observable<string>;
};

export const stdin = (): Sources => {
  const rl = createInterface({
    input: process.stdin,
  });
  return {
    line$: fromEvent<string>(rl, 'line'),
  };
};
