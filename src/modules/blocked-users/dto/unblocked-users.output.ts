import { Field, ObjectType } from '@nestjs/graphql';
import { createUnionWithError } from '@shared/dto/error.output';

@ObjectType()
export class UnblockedUserOutput {
  @Field()
  unblocked: boolean;
}

export const UnblockedUsersUnionOutput = createUnionWithError<typeof UnblockedUserOutput>(UnblockedUserOutput);
