import { Side } from './side';

export enum Cell {
  Playable = '_',
  Unplayable = '.',
  // biome-ignore lint/style/useLiteralEnumMembers: <explanation>
  PlayedX = Side.X,
  // biome-ignore lint/style/useLiteralEnumMembers: <explanation>
  PlayedO = Side.O,
}
