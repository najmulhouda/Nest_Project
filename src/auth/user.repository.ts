import { AuthCredentialDto } from 'src/config/dto/auth-credential.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialDto) {}
}
