import { type Board, Cell } from "../t3en";

const random = <A>(as: A[]): A => {
  const index = Math.floor(Math.random() * as.length);
  return as[index];
};

export const best = async (
  board: Board
): Promise<readonly [number, number]> => {
  const indices = board
    .flatMap((row, i) =>
      row.map((cell, j) => [i, j, cell === Cell.Playable] as const)
    )
    .filter(([, , playable]) => playable);
  if (indices.length === 0) throw new Error("no playable cells");
  const [x, y] = random(indices);
  return [x, y];
};
