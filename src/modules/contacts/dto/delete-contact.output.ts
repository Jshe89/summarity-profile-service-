import { Field, ObjectType } from '@nestjs/graphql';
import { createUnionWithError } from '@shared/dto/error.output';

@ObjectType()
export class DeleteContactOutput {
  @Field()
  deleted: boolean;
}

export const DeleteContactUnionOutput = createUnionWithError<typeof DeleteContactOutput>(DeleteContactOutput);
