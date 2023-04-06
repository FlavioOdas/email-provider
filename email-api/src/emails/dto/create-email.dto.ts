import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateEmailDto {
  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  recipient: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  date: Date;

  @IsBoolean()
  @IsNotEmpty()
  read: boolean;

  @IsBoolean()
  @IsNotEmpty()
  deleted: boolean;
}
