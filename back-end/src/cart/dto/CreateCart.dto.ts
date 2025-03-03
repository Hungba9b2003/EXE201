import { IsNotEmpty, IsNumber, IsString, isString } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  @IsString()
  size: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
