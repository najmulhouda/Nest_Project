//auth service

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: Repository<User>,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialDto): Promise<User> {
    const { username, password } = authCredentialsDto;

    // const exists = this.findOne({ username });

    // if (exists) {
    //   //throw new Error('User already exists');
    // }
    const user = new User();
    user.username = username;
    user.password = password;

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
    // await user.save();
  }
}
