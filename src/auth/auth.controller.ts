import { Post, Get, Controller, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto)
  }

  @Post('signin')
  signIn() {
    return this.authService.signIn()
  }

  @Get('signout')
  signOut() {
    return this.authService.signOut()
  }
}
