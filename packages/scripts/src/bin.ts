#!/usr/bin/env node

// This file was inspired by https://github.com/isaacs/rimraf/blob/main/bin.js.
import { execa } from 'execa';

const PATH_TO_APP = new URL('../../app', import.meta.url);
const [_node, _binjs, command, ...restParams] = process.argv;

async function main() {
  switch (command) {
    // This works, now let's do the rest.
    case 'start':
    case 'dev':
    case 'build':
    case 'preview': {
      await execa('yarn', [command, ...restParams], {
        cwd: PATH_TO_APP.pathname,
        stdout: process.stdout,
        env: {
          PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV,
          // Just so when migrating to Netlify is smooth.
          PUBLIC_NETLIFY: process.env.NETLIFY
        }
      });
      break;
    }
    default: {
      console.log(
        'Invalid command. Available commands are `start`, `dev`, `build`, and `preview`.'
      );
    }
  }
}

main();
