import { pipe } from 'fp-ts/lib/function';
import { and } from './and';
import { digit } from './digit';
import { many } from './many';
import { map } from './map';
import { non_zero_digit } from './non-zero-digit';
import type { Parser } from './parser';

export const non_zero_positive_integer: Parser<number> = pipe(
  and(non_zero_digit, many(digit)),
  map(([first, rest]) => [first, ...rest].join('')),
  map(Number),
);
