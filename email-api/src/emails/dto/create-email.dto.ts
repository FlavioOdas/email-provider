import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateEmailDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  sender: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  recipient: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}
