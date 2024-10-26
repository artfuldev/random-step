import { EMPTY, of } from 'rxjs';
import { type Parser, or } from '../parser';
import type { Sinks } from '../sinks';
import * as H from './handshake';
import * as I from './identify';
import * as M from './move';
import * as Q from './quit';

export type Command = H.Handshake | I.Identify | M.Move | Q.Quit;

export const parse: Parser<Command> = or(H.parse, I.parse, M.parse, Q.parse);

export const run = (command: Command): Sinks => {
  switch (command[0]) {
    case 'handshake':
      return H.handshake(command);
    case 'identify':
      return I.identify(command);
    case 'move':
      return M.move(command);
    case 'quit':
      return Q.quit(command);
    default:
      return {
        stdout: EMPTY,
        stderr: of(new Error('unknown command').message),
        exit: EMPTY,
      };
  }
};
