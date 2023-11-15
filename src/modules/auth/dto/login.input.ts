import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength, MaxLength } from 'class-validator';

@InputType()
export class LoginInput {
  @IsEmail()
  @Field()
  email: string;

  @MinLength(8)
  @MaxLength(32)
  @Field()
  password: string;
}
