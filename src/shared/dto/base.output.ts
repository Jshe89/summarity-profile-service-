import { Field, ObjectType, createUnionType } from '@nestjs/graphql';
import { GraphQLDateTime } from 'graphql-scalars';
import * as _ from 'lodash';

@ObjectType()
export class BaseOutput {
  @Field({ nullable: false })
  id: string;

  @Field(() => GraphQLDateTime, { nullable: false })
  createdAt: Date;

  @Field(() => GraphQLDateTime, { nullable: false })
  updatedAt: Date;

  @Field(() => GraphQLDateTime, { nullable: true })
  deletedAt?: Date;
}

export const createMultipleUnion = <T extends Array<new (...args: any[]) => any>>(...entities: T) => createUnionType({
  name: `${_.upperFirst(_.camelCase(entities.map(e => e.name).join('_')))}Union`,
  types: () => [...entities] as const
});
