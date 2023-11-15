import { INestApplicationContext } from '@nestjs/common';
export declare function parseProcessArgs(validNames?: string[]): {
    [_: string]: string;
};
export declare function parseCommaSeparatedStrings(str: string): string[];
export declare function buildLogContext(fileName: string): string;
export declare function wait(ms: number): Promise<void>;
export declare function setExitHandlers(failForcedTimeout?: number): void;
export declare function finalizeApp(app: INestApplicationContext, waitMsBeforeExit?: number): Promise<void>;
