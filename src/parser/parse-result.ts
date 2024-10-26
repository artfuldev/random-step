export type ParseSuccess<T> = { type: 'success'; parsed: T; remaining: string };
export type ParseFailure = { type: 'failure'; reason: string };
export type ParseResult<T> = ParseSuccess<T> | ParseFailure;

export const ParseResult = {
  Success: <T>(parsed: T, remaining: string): ParseResult<T> => ({
    type: 'success',
    parsed,
    remaining,
  }),
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  Failure: <T = any>(reason: string): ParseResult<T> => ({
    type: 'failure',
    reason,
  }),
  match:
    <A, B>({
      success,
      failure,
    }: {
      success: (parsed: A, remaining: string) => B;
      failure: (reason: string) => B;
    }) =>
    (result: ParseResult<A>): B => {
      switch (result.type) {
        case 'success':
          return success(result.parsed, result.remaining);
        case 'failure':
          return failure(result.reason);
      }
    },
};
