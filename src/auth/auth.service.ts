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

  async signIn(dto: AuthDto) {
    const { email, password } = dto

    const foundUser = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!foundUser) {
      throw new BadRequestException('Wrong credentials')
    }

    const isPasswordCorrect = await this.validatePassword(
      password,
      foundUser.hashedPassword
    )

    if (!isPasswordCorrect) {
      throw new BadRequestException('Wrong credentials')
    }

    // sign jwt and return to the user

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
    return await bcrypt.hash(password, saltOrRounds)
  }

  async validatePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword)
  }
}
