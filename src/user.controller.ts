import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { of } from 'rxjs';

@Controller('users')
export class UsersConttroller {
  @Get('/profile')
  getProfile(@Req() req: Request) {
    console.log(req);
    return of({
      moye: 'moye',
    });
  }
}
