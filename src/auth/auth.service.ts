import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthInput, AuthResult, SignInpData } from './auth.types';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignInpData | null> {
    const user = await this.usersService.findByEmail(input.email);
    if (user) {
      const isMatch = await bcrypt.compare(input.password, user.password);
      if (isMatch) {
        return {
          userId: user.id,
          email: user.email,
        };
      }
    }

    return null;
  }

  async register(input: AuthInput): Promise<{ result: boolean }> {
    const user = await this.usersService.addUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    await this.signIn(user);

    return { result: true };
  }

  async signIn(user: SignInpData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      username: user.email,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken: accessToken,
      userId: user.userId,
      username: user.email,
    };
  }
}
