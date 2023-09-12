import { BadRequestException, Injectable } from '@nestjs/common';

import { Provider, User } from '@prisma/client';
import { Request } from 'express';

import { UsersService } from '../users/users.service';

export interface AuthRequest extends Request {
  user: User;
}

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async socialProviderLogin(req: AuthRequest, provider: Provider) {
    try {
      const user = await this.usersService.continueWithSocialProvider(req);
      const [accessToken, refreshToken] = await this.generateTokens(user);
      // redirect to client
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async generateTokens(user: User) {
    const accessToken = {};
    const refreshToken = {};

    return [accessToken, refreshToken];
  }
}
