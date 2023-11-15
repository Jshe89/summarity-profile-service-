import { Field, ObjectType } from '@nestjs/graphql';
import { createUnionWithError } from '@shared/dto/error.output';
import { BaseOutput } from '@shared/dto/base.output';

@ObjectType()
export class ProfileOutput extends BaseOutput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  title?: string;
}

export const ProfileUnionOutput = createUnionWithError<typeof ProfileOutput>(ProfileOutput);
