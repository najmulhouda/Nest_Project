//auth service

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialDto): Promise<User> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      return user;
    } catch (error) {
      // console.log(error.code);
      if (error.code === '23505') {
        // throw new Error('Username already exists');
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  // async signIn(authCredentialsDto: AuthCredentialDto): Promise<string> {
  //   const { username, password } = authCredentialsDto;
  //   const user = await this.userRepository.findOne({ username });
  //   if (user && (await user.validatePassword(password))) {
  //     return user.username;
  //   } else {
  //     return null;
  //   }
  // }
  async signIn(authCredentialsDto: AuthCredentialDto): Promise<{
    user: {
      id: number;
      username: string;
    };
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await user.validatePassword(password))) {
      // return user.username;

      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);

      return {
        user: {
          id: user.id,
          username: user.username,
        },
        accessToken: accessToken,
        tokenType: 'Bearer',
        expiresIn: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          .getTime()
          .toString(),
      };
    } else {
      // return null;
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
