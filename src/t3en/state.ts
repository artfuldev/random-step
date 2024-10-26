import { pipe } from 'fp-ts/lib/function';
import { type Parser, and, map, whitespace } from '../parser';
import * as B from './board';
import * as S from './side';

export type State = [B.Board, S.Side];

export const parse: Parser<State> = pipe(
  and(B.parse, whitespace, S.parse),
  map(([board, , side]) => [board, side]),
);
