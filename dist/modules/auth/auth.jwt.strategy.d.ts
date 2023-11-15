import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IConfig } from '@config/configuration.types';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(configService: ConfigService<IConfig>);
    validate(payload: any): Promise<{
        id: any;
        email: any;
    }>;
}
export {};
