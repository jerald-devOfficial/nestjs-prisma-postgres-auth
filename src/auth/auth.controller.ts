import { Post, Get, Controller } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp() {
    return this.authService.signUp()
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
