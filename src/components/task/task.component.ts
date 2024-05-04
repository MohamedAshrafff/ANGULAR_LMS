import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {
  task: any;
  taskId: any;
  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    this.task = this.tasksService.tasks[this.taskId];
  }
  updateTask() {
    this.tasksService.updateTask(this.task, this.taskId);
  }
}
