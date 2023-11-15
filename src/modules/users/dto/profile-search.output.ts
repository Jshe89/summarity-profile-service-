import { Field, ObjectType } from '@nestjs/graphql';
import { createUnionWithError } from '@shared/dto/error.output';
import { ProfileOutput } from './profile.output';

@ObjectType()
export class ProfileSearchOutput {
  @Field(() => [ProfileOutput])
  profiles: ProfileOutput[];
}

export const ProfileSearchUnionOutput = createUnionWithError<typeof ProfileSearchOutput>(ProfileSearchOutput);
