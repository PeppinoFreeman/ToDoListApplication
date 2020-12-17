import { TaskService } from './../services/task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.object';

@Component({
  selector: 'app-bilan',
  templateUrl: './taskBilan.component.html',
  styles: [
    `
      span {
        color: red;
        font-style: Italic;
      }
      .remainTaskText {
        font-style: Italic;
      }
      ul {
        list-style: none;
      }
    `,
  ],
})
export class TaskBilanComponent implements OnInit{
  private TaskService: TaskService;
  public taskList: Task[];
  public state: number[];
  public finished: number;
  public unfinished: number;
  public delayFinished: number;

  public finishedInPeriod: number;
  public unfinishedInPeriod: number;
  public delayFinishedInPeriod: number;

  public periodStart: string;
  public periodEnd: string;

  constructor(taskService: TaskService) {
    this.TaskService = taskService;
  }
  ngOnInit(): void {
    this.TaskService.updateList.subscribe((taskList: Task[]) => {
      this.taskList = taskList;
      this.calc_global_percentage();
    });
    this.TaskService.getServerTaskList();
  }

  // Teste la cohérence entre les dates de la période
  testPeriodError(): boolean {
    const test: boolean = this.TaskService.testPeriodError(
      this.periodStart,
      this.periodEnd
    );
    if (test) {
      this.calc_period_percentage();
    }
    return test;
  }
  // Affiche les tâches dûes dans la période
  showTaskInPeriod(task: Task): boolean {
    return this.TaskService.showTaskInPeriod(
      task,
      this.periodStart,
      this.periodEnd
    );
  }
  // Calcule les taux des tâches de la période saisie
  calc_period_percentage(): void {
    const response = (this.finishedInPeriod = this.TaskService.calc_periodic_percentage(
      this.taskList,
      this.periodStart,
      this.periodEnd
    ));
    this.finishedInPeriod = response.finishedInPeriod;
    this.unfinishedInPeriod = response.unfinishedInPeriod;
    this.delayFinishedInPeriod = response.delayFinishedInPeriod;
  }
  // Calcule les taux de toutes les tâches
  calc_global_percentage(): void {
    const response = this.TaskService.calc_global_percentage(this.taskList);
    this.finished = response.finished;
    this.unfinished = response.unfinished;
    this.delayFinished = response.delayFinished;
  }
}
