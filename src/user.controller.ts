import { Body, Controller, Post } from '@nestjs/common';

interface VideoDTO {
  name: string;
  tag: string;
  date: Date;
}

@Controller('/users')
export class UsersController {
  @Post('video')
  addVideo(@Body() requestData: VideoDTO) {
    console.log(requestData.name, requestData.tag, requestData.date);
    return {
      success: true,
    };
  }
}
