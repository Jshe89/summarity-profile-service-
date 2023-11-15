import { Field, ObjectType } from '@nestjs/graphql';
import { createUnionWithError } from '@shared/dto/error.output';
import { MyProfileOutput } from '@modules/users/dto/my-profile.output';

@ObjectType()
export class LoginOutput {
  @Field()
  accessToken: string;

  @Field(() => MyProfileOutput)
  profile: MyProfileOutput;
}

export const LoginUnionOutput = createUnionWithError<typeof LoginOutput>(LoginOutput);
