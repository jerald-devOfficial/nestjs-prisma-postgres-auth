import { Get, Injectable, Post } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  @Post('signup')
  async signUp() {
    return {
      message: 'Successfully signed up!'
    }
  }

  @Post('signin')
  async signIn() {
    return {
      message: 'Sign in was successful!'
    }
  }

  @Get('signout')
  async signOut() {
    return {
      message: 'User has been logged out!'
    }
  }
}
