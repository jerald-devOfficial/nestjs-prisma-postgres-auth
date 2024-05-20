/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { User } from '@prisma/client'
import { Request } from 'express'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(
    id: string,
    req: Request
  ): Promise<Omit<User, 'hashedPassword'>> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new NotFoundException()
    }

    const decodedUser = req.user as { id: string; email: string }

    if (user.id !== decodedUser.id) {
      throw new ForbiddenException()
    }

    delete user.hashedPassword

    return user
  }

  async getUsers(): Promise<Omit<User, 'hashedPassword'>[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    })
  }
}
