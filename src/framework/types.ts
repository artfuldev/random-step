import type { Observable } from 'rxjs';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type SinkProxies<Si> = { [P in keyof Si]: Observable<any> };

export type Driver<Si, So> = Si extends void ? () => So : (stream: Si) => So;

export type DisposeFunction = () => void;

export type Drivers = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
  [name: string]: Driver<Observable<any>, any | void>;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type Main = (...args: Array<any>) => any;

export type Sources<D extends Drivers> = { [k in keyof D]: ReturnType<D[k]> };

export type Sinks<M extends Main> = ReturnType<M>;

export type MatchingMain<D extends Drivers, M extends Main> =
  | (Main & ((so: Sources<D>) => Sinks<M>))
  | (Main & (() => Sinks<M>));

/**
 * For whatever reason, this does not work with RxJS observables,
 * this for this reason, `MatchingDrivers` has to be redefined
 * in @cycle/rxjs-run-
 */
export type ToStream<S> = S extends Observable<infer T> ? Observable<T> : S;

type WidenStream<S, U> = S extends Observable<infer T>
  ? T extends U
    ? U
    : never
  : // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    any;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type GetValidInputs<D extends Driver<any, any>> = D extends Driver<infer S, any>
  ? S extends Observable<infer T>
    ? T
    : never
  : never;

export type MatchingDrivers<D extends Drivers, M extends Main> = Drivers & {
  [k in string & keyof Sinks<M>]:
    | (() => Sources<D>[k])
    | ((
        si: Observable<
          WidenStream<ToStream<Sinks<M>[k]>, GetValidInputs<D[k]>>
        >,
      ) => Sources<D>[k]);
};
