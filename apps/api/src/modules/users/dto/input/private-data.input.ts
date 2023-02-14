import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString, Length } from 'class-validator';
import { IPrivateData } from '@common/interface';
import { PrivateData } from '../user.model';

@InputType()
export class PrivateDataInput extends PartialType(PrivateData, InputType) implements IPrivateData {
  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'The firstname is incorrect' })
  @Length(2, 30)
  firstname?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'The lastname is incorrect' })
  @Length(2, 30)
  lastname?: string;
}
