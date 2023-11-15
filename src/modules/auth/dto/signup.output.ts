import { Field, ObjectType } from '@nestjs/graphql';
import { createUnionWithError } from '@shared/dto/error.output';
import { MyProfileOutput } from '@modules/users/dto/my-profile.output';

@ObjectType()
export class SignupOutput {
  @Field()
  accessToken: string;

  @Field(() => MyProfileOutput)
  profile: MyProfileOutput;
}

export const SignupUnionOutput = createUnionWithError<typeof SignupOutput>(SignupOutput);
