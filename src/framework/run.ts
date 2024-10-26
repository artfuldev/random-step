import { type Observable, Subject } from 'rxjs';
import type {
  MatchingDrivers,
  MatchingMain,
  SinkProxies,
  Sinks,
  Sources,
} from './types';

export const run = <
  D extends MatchingDrivers<D, M>,
  M extends MatchingMain<D, M>,
>(
  main: M,
  drivers: D,
) => {
  const subjects = (Object.keys(drivers) as Array<keyof D>).reduce(
    (acc, k) => ({
      // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
      ...acc,
      [k]: new Subject(),
    }),
    {} as SinkProxies<Sinks<M>>,
  );
  const sources = (Object.keys(drivers) as Array<keyof D>).reduce(
    (acc, k) => ({
      // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
      ...acc,
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      [k]: (drivers as any)[k]((subjects as any)[k]),
    }),
    {} as Sources<D>,
  );
  const sinks = main(sources);
  // biome-ignore lint/complexity/noForEach: <explanation>
  Object.keys(sinks).forEach((key) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const sink = sinks[key] as Observable<any>;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const proxy = (subjects as any)[key] as Subject<any>;
    sink.subscribe({
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      next: (value: any) => {
        proxy.next(value);
      },
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      error: (err: any) => {
        proxy.error(err);
      },
      complete: () => {
        proxy.complete();
      },
    });
  });
};
