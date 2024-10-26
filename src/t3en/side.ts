import { type Parser, or, token } from "../parser";

export enum Side {
  X = "x",
  O = "o",
}

export const parse: Parser<Side> = or(token(Side.X), token(Side.O));
