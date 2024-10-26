import { Observable, Subject } from "rxjs";
import type {
  MatchingDrivers,
  MatchingMain,
  SinkProxies,
  Sinks,
  Sources,
} from "./types";

export const run = <
  D extends MatchingDrivers<D, M>,
  M extends MatchingMain<D, M>
>(
  main: M,
  drivers: D
) => {
  const subjects = (Object.keys(drivers) as Array<keyof D>).reduce(
    (acc, k) => ({
      ...acc,
      [k]: new Subject(),
    }),
    {} as SinkProxies<Sinks<M>>
  );
  const sources = (Object.keys(drivers) as Array<keyof D>).reduce(
    (acc, k) => ({
      ...acc,
      [k]: (drivers as any)[k]((subjects as any)[k]),
    }),
    {} as Sources<D>
  );
  const sinks = main(sources);
  Object.keys(sinks).forEach((key) => {
    const sink = sinks[key] as Observable<any>;
    const proxy = (subjects as any)[key] as Subject<any>;
    sink.subscribe({
      next: (value: any) => {
        proxy.next(value);
      },
      error: (err: any) => {
        proxy.error(err);
      },
      complete: () => {
        proxy.complete();
      },
    });
  });
};
