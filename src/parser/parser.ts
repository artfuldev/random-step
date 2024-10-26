import type { ParseResult } from './parse-result';

export type Parser<T> = (str: string) => ParseResult<T>;
