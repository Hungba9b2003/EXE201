import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsMongoId,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // Đảm bảo mỗi phần tử trong mảng là string
  images: string[];

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  descriptionFull: string;

  @IsNotEmpty()
  @IsNumber()
  originalPrice: number;

  @IsNotEmpty()
  @IsNumber()
  salePrice: number;

  @IsArray()
  sizes: { size: string; quantity: number }[];

  @IsNotEmpty()
  @IsString()
  material: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  pattern: string;

  @IsNotEmpty()
  @IsString()
  season: string;

  @IsNotEmpty()
  @IsString()
  waterResistance: string;

  @IsNotEmpty()
  @IsString()
  closureType: string;

  @IsNotEmpty()
  @IsString()
  stretch: string;

  @IsOptional()
  @IsEnum(['dog', 'cat', 'other'])
  category: string;
}
