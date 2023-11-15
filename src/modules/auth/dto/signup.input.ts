import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator';

@InputType()
export class SignupInput {
  @IsEmail()
  @Field()
  email: string;

  @MinLength(2)
  @MaxLength(32)
  @Field()
  firstName: string;

  @MinLength(2)
  @MaxLength(32)
  @Field()
  lastName: string;

  @MinLength(8)
  @MaxLength(32)
  @Field()
  password: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(128)
  @Field({ nullable: true })
  title?: string;
}
