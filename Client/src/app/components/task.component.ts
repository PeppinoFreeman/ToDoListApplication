import { TaskService } from './../services/task.service';
import { Task } from './../models/task.object';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit{
  private TaskService: TaskService;
  public taskList: Task[];

  public actualDate: Date;

  constructor(taskService: TaskService) {
    this.TaskService = taskService;
    this.actualDate = new Date();
  }
  ngOnInit(): void {
    this.TaskService.updateList.subscribe((taskList: Task[]) => {
      this.taskList = taskList;
    });
    this.TaskService.getServerTaskList();
  }

  // Incrémente l'application d'une journée
  nextDay(): void {
    this.actualDate = this.TaskService.nextDay();
  }
}
