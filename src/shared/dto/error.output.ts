import { Field, ObjectType, createUnionType } from '@nestjs/graphql';
import * as _ from 'lodash';

@ObjectType()
export class ErrorOutput {
  @Field()
  id: string;

  @Field()
  message: string;

  @Field()
  type: string;
}

@ObjectType()
export class ErrorListOutput {
  @Field(() => [ErrorOutput])
  errors: ErrorOutput[];
}

export const createUnionWithError = <T extends new (...args: any[]) => any>(Entity: T) => createUnionType({
  name: `${Entity.name}Union`,
  types: () => [Entity, ErrorListOutput] as const,
  resolveType(value) {
    if (value.errors) {
      return ErrorListOutput;
    }
    return Entity;
  },
});

export const createMiltipleUnionWithError = <T extends Array<new (...args: any[]) => any>>(...entities: T) => createUnionType({
  name: `${_.upperFirst(_.camelCase(entities.map(e => e.name).join('_')))}`,
  types: () => [...entities, ErrorListOutput] as const,
  resolveType(value) {
    if (value.errors) {
      return ErrorListOutput;
    }
    return entities;
  },
});
