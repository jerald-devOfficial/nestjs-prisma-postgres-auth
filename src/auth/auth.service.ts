import {
  BadRequestException,
  ForbiddenException,
  Injectable
} from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { AuthDto, SignInDto } from './dto/auth.dto'
import * as bcrypt from 'bcrypt'
import { jwtSecret } from 'src/utils/constants'
import { JwtService } from '@nestjs/jwt'
import { Request, Response } from 'express'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  async signUp(dto: AuthDto) {
    const { email, password, name } = dto

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
        name,
        email,
        hashedPassword
      }
    })

    return {
      message: 'Successfully signed up!'
    }
  }

  async signIn(dto: SignInDto, req: Request, res: Response) {
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

    const token = await this.signToken({
      email: foundUser.email,
      id: foundUser.id
    })

    if (!token) {
      throw new ForbiddenException('Wrong credentials')
    }

    res.cookie('token', token)

    return res.send({ message: 'Sign in was successful!' })
  }

  async signOut(req: Request, res: Response) {
    res.clearCookie('token')
    return res.send({ message: 'Sign out was successful!' })
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10
    return await bcrypt.hash(password, saltOrRounds)
  }

  async validatePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword)
  }

  async signToken(args: { email: string; id: string }) {
    const payload = args

    return this.jwt.signAsync(payload, {
      secret: jwtSecret
    })
  }
}
