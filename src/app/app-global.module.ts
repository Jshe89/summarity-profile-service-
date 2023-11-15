import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import configuration from '@config/configuration';
import { IConfig } from '@config/configuration.types';

@Global()
@Module({
  providers: [],
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      ignoreEnvFile: false,
      load: [() => configuration]
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: (cfg: ConfigService<IConfig>) => ({
        tracing: cfg.get('app.graphql.tracing', { infer: true }),
        debug: cfg.get('app.graphql.debug', { infer: true }),
        introspection: cfg.get('app.graphql.introspection', { infer: true }),
        playground: cfg.get('app.graphql.playground', { infer: true }),
        autoSchemaFile: 'src/schema.gql',
        path: cfg.get('app.graphql.path', { infer: true }),
        engine: {
          debugPrintReports: true
        },
        context: ({ req, connection }) => {
          // subscriptions
          if (connection) {
            return { req: { headers: connection.context } };
          }
          // queries and mutations
          return { req };
        },
        uploads: false,
        persistedQueries: false
        // cors: true
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: [
            '.env',
            '.env.local',
            '.env.development',
            '.env.development.local',
            '.env.test.local',
            '.env.production.local',
          ],
        }),
      ],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<IConfig>): Promise<TypeOrmModuleOptions> => {
        return Object.assign(
          {},
          configService.get('database', { infer: true }),
        );
      }
    }),
  ],
  exports: [
    ConfigModule,
  ]
})
export class AppGlobalModule {}
