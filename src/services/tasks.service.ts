import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks: Task[] = [];
  constructor() {}
  deleteTask(i: number): void {
    this.tasks.splice(i, 1);
  }
  addTask(title: any, desc: any, time: any): void {
    this.tasks.push({
      title: title,
      description: desc,
      date: time,
      isCompleted: false,
    });
  }
  updateTask(id: any, task: any) {
    this.tasks[id] = task;
  }
}
