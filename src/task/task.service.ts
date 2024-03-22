import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  private tasks = [];
  getAllTask() {
    return this.tasks;
  }
}
