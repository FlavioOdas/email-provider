import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UpdateEmailDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  sender: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  recipient: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  body: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  read: boolean;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  deleted: boolean;
}
