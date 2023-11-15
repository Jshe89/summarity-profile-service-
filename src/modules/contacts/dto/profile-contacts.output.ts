import { Field, ObjectType } from '@nestjs/graphql';
import { createUnionWithError } from '@shared/dto/error.output';
import { ProfileOutput } from '@modules/users/dto/profile.output';

@ObjectType()
export class ProfileContactsOutput {
  @Field(() => [ProfileOutput])
  contacts: ProfileOutput[];
}

export const ProfileContactsUnionOutput = createUnionWithError<typeof ProfileContactsOutput>(ProfileContactsOutput);
