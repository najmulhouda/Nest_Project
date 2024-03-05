import { Module } from '@nestjs/common';
import { UsersConttroller } from './user.controller';

@Module({
  controllers: [UsersConttroller],
})
export class AppModule {}
