import * as fs from 'fs';
import { parse } from 'dotenv';
import * as _ from 'lodash';
import { Logger } from '@nestjs/common';
import { buildLogContext } from './app.helper';

export function validateEnv(filename: string): Record<string, any> {
  const logContext = buildLogContext(filename);
  const env = process.env;
  if (!env.NODE_ENV) {
    throw new Error('No NODE_ENV was specified in environment');
  }
  Logger.log(`Environment: ${env.NODE_ENV}`, logContext);

  const envFilePath = `.env.${env.NODE_ENV}`;
  if (fs.existsSync(envFilePath)) {
    Logger.log(`Found .env file "${envFilePath}". Loading keys...`, logContext);
    const data: any = parse(fs.readFileSync(envFilePath));
    Object.keys(data).forEach(k => {
      if (env[k] === undefined) {
        env[k] = data[k];
      }
    });
  }

  const requiredKeys: string[] = Object.keys(parse(fs.readFileSync('.env.example')));
  const missedKeys = _.difference(requiredKeys, Object.keys(env));
  if (missedKeys.length > 0) {
    throw new Error(`The following ENV keys must be specified: ${missedKeys}`);
  }
  return env;
}
