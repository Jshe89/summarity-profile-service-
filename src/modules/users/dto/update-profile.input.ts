import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @IsOptional()
  @IsEmail()
  @Field({ nullable: true })
  email?: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(32)
  @Field({ nullable: true })
  firstName?: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(32)
  @Field({ nullable: true })
  lastName?: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(128)
  @Field({ nullable: true })
  title?: string;
}
