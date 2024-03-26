import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
@Injectable()
export class TaskService {
  private tasks: Task[] = [];
  getAllTask(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
  }
}
