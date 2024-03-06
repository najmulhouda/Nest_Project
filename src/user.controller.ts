import { Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { of } from 'rxjs';

@Controller('users')
export class UsersConttroller {
  @Post('/profile')
  @HttpCode(HttpStatus.RESET_CONTENT)
  getProfile(@Req() req: Request) {
    console.log(req);
    return of({
      moye: 'moye',
    });
  }
}
