import * as path from 'path';
import { setTimeout } from 'timers';
import * as _ from 'lodash';
import { INestApplicationContext, Logger } from '@nestjs/common';

const logContext = buildLogContext(__filename);

export function parseProcessArgs(validNames?: string[]): { [_: string]: string } {
  const args = process.argv.slice(2);
  const result = args.reduce(
    (r, arg) => {
      const [argName, argValue] = arg.split('=');
      if (argName && argValue !== undefined) {
        if (validNames && validNames.indexOf(argName) === -1) {
          throw new Error(`Unsupported parameter "${argName}"!`);
        }
        r[argName] = argValue;
      }
      return r;
    },
    {}
  );

  if (validNames) {
    const diff = _.difference(validNames, Object.keys(result));
    if (diff.length > 0) {
      throw new Error(`No required arguments were found: [ ${diff.join(', ')} ]`);
    }
  }

  return result;
}

export function parseCommaSeparatedStrings(str: string): string[] {
  return (str || '').split(',').map(s => s.trim()).filter(s => !!s);
}

export function buildLogContext(fileName: string): string {
  return path.basename(fileName).replace(/\.(t|j)s$/, '');
}

export async function wait(ms: number): Promise<void> {
  Logger.log(`Waiting for ${ms} msec to allow complete all background operations like ES syncing etc. ...`, logContext);
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function setExitHandlers(failForcedTimeout?: number): void {
  process.once('unhandledRejection', err => {
    Logger.error((err as Error).stack, undefined, logContext);
    process.exit(1);
  });

  if (failForcedTimeout) {
    setTimeout(() => {
      throw new Error(`Force the unfinished script terminating after the timeout of ${failForcedTimeout}ms!`);
    }, failForcedTimeout).unref();
  }
}

export async function finalizeApp(app: INestApplicationContext, waitMsBeforeExit?: number): Promise<void> {
  if (waitMsBeforeExit) await wait(waitMsBeforeExit);
  Logger.log('Done');
  await app.close();
}
