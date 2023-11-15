import { Field, ObjectType } from '@nestjs/graphql';
import { createUnionWithError } from '@shared/dto/error.output';
import { BaseOutput } from '@shared/dto/base.output';

@ObjectType()
export class MyProfileOutput extends BaseOutput {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  title?: string;
}

export const MyProfileUnionOutput = createUnionWithError<typeof MyProfileOutput>(MyProfileOutput);
