import { token } from '.';
import { or } from './or';

export const whitespace = or(token(' '), token('\t'), token('\n'), token('\r'));
