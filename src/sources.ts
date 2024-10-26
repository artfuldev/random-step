import type { stdin } from './drivers';

export type Sources = {
  stdin: ReturnType<typeof stdin>;
};
