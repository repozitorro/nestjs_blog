import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequestInterface } from '../../types/expressRequest.interface';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRETS'),
      });
      req.user = await this.userService.findById(decode.id);
      next();
    } catch (e) {
      req.user = null;
      next();
    }
  }
}
