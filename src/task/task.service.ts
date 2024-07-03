// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-task-filter';
// import { TaskStatus } from './task-status.enum';
// import { Task } from './task.entity';
// import { TaskRepository } from './task.repository';

// @Injectable()
// export class TaskService {
//   constructor(
//     @InjectRepository(TaskRepository)
//     private taskRepository: TaskRepository,
//   ) {}

//   async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
//     return this.taskRepository.getTasks(filterDto);
//   }

//   async getTaskById(id: number): Promise<Task> {
//     const record = await this.taskRepository.findOne({
//       where: { id },
//     });
//     if (!record) {
//       throw new NotFoundException(`Task with ID "${id}" not found`);
//     }
//     return record;
//   }

//   async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
//     return this.taskRepository.createTask(createTaskDto);
//   }

//   async deleteTask(id: number): Promise<void> {
//     const result = await this.taskRepository.delete(id);
//     if (result.affected === 0) {
//       throw new NotFoundException(`Task with ID "${id}" not found`);
//     }
//   }

//   async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
//     const task = await this.getTaskById(id);
//     task.status = status;
//     await task.save();
//     return task;
//   }
// }

// src/tasks/tasks.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
// import { GetTaskFilterDto } from '';
import { User } from 'src/auth/user.entity';
import { GetTasksFilterDto } from './dto/get-task-filter';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.taskRepository.createQueryBuilder('task');
    query.where({ user: { id: user.id } });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async getTaskById(id: number): Promise<Task> {
    const record = await this.taskRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return record;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();
    delete task.user;
    return task;
  }

  async deleteTask(id: number) {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
