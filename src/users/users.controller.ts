import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from '@prisma/client'
import { JwtAuthGuard } from 'src/auth/jwt.guard'
import { Request } from 'express'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(
    @Param() params: { id: string },
    @Req() req: Request
  ): Promise<Omit<User, 'hashedPassword'>> {
    return this.usersService.getUser(params.id, req)
  }

  @Get()
  async getUsers(): Promise<Omit<User, 'hashedPassword'>[]> {
    return this.usersService.getUsers()
  }
}
