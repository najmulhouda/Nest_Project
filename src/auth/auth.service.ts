//auth service

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
  async signIn(authCredentialsDto: AuthCredentialDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ username });
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
