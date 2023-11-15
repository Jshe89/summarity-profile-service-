import { Field, ObjectType } from '@nestjs/graphql';
import { createUnionWithError } from '@shared/dto/error.output';

@ObjectType()
export class BlockedUserOutput {
  @Field()
  blocked: boolean;
}

export const BlockedUsersUnionOutput = createUnionWithError<typeof BlockedUserOutput>(BlockedUserOutput);
