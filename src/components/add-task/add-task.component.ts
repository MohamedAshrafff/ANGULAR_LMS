import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  constructor(public tasksService: TasksService) {}
  addTask(taskTitle: any, taskDesc: any, taskTime: any): void {
    this.tasksService.addTask(taskTitle.value, taskDesc.value, taskTime.value);
  }
}
