import { Field, ObjectType } from '@nestjs/graphql';
import { createUnionWithError } from '@shared/dto/error.output';
import { MyProfileOutput } from '@modules/users/dto/my-profile.output';

@ObjectType()
export class MyBlockedUsersOutput {
  @Field(() => [MyProfileOutput])
  blockedUsers: MyProfileOutput[];
}

export const MyBlockedUsersUnionOutput = createUnionWithError<typeof MyBlockedUsersOutput>(MyBlockedUsersOutput);
