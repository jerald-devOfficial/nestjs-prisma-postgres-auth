import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { AuthDto } from './dto/auth.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(dto: AuthDto) {
    const { email, password } = dto

    const foundUser = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (foundUser) {
      throw new BadRequestException('email is already taken')
    }

    const hashedPassword = await this.hashPassword(password)

    await this.prisma.user.create({
      data: {
        email,
        hashedPassword
      }
    })

    return {
      message: 'Successfully signed up!'
    }
  }

  async signIn() {
    return {
      message: 'Sign in was successful!'
    }
  }

  async signOut() {
    return {
      message: 'User has been logged out!'
    }
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltOrRounds)

    return hashedPassword
  }
}
