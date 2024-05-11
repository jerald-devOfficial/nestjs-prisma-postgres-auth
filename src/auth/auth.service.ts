import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor() {}

  async signUp() {
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
}
