import { Post, Get, Controller } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp() {
    return 'signup route'
  }

  @Post('signin')
  signIn() {
    return 'signin route'
  }

  @Get('signout')
  signOut() {
    return 'signout route'
  }
}
