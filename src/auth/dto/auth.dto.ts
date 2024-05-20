import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string

  @IsNotEmpty()
  @IsString()
  @Length(8, 20, {
    message: 'Password must be between 8 and 20 characters long'
  })
  public password: string

  @IsNotEmpty()
  @IsString()
  @Length(2, 20, {
    message: 'Name must be between 2 and 20 characters long'
  })
  public name: string
}

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string

  @IsNotEmpty()
  @IsString()
  @Length(8, 20, {
    message: 'Password must be between 8 and 20 characters long'
  })
  public password: string
}
