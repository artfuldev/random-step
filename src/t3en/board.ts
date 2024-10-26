import { ParseResult, type Parser } from '../parser';
import { Cell } from './cell';

export type Board = Cell[][];

const expected = new Set('0123456789/_.xo'.split(''));

const cells = new Set([
  Cell.Playable,
  Cell.Unplayable,
  Cell.PlayedX,
  Cell.PlayedO,
]);

export const parse: Parser<Board> = (str) => {
  const board: Cell[][] = [[]];
  let x = 0;
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (!expected.has(char)) {
      return ParseResult.Success(board, str.slice(i));
    }
    if (char === '/') {
      board.push([]);
      x++;
      count = 0;
      continue;
    }
    const digit = Number.parseInt(char);
    if (Number.isSafeInteger(digit)) {
      count *= 10;
      count += digit;
      continue;
    }
    count = count === 0 ? 1 : count;
    const cell = char as Cell;
    if (!cells.has(cell)) return ParseResult.Failure(`Invalid cell ${cell}`);
    for (let j = 0; j < count; j++) {
      board[x].push(cell);
    }
    count = 0;
  }
  return ParseResult.Success(board, '');
};
