//auth service

import { Injectable } from '@nestjs/common';
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

  async signUp(authCredentialsDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const exists = this.findOne({ username });

    if (exists) {
      //throw new Error('User already exists');
    }
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
  }
  // async signUp(authCredentialsDto: AuthCredentialDto): Promise<void> {
  //    this.userRepository.signUp(authCredentialsDto);
  // }
}
