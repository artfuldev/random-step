import { app } from './app';
import { exit, stderr, stdin, stdout } from './drivers';
import { run } from './framework';

run(app, {
  stdin,
  stdout,
  stderr,
  exit,
});
