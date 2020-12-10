import { Config } from './../models/config';
import { Task } from './../models/task.object';
import { Injectable } from '@angular/core';

@Injectable()
export class TaskFormService {
  constructor() {}

  calculateDuration(task: Task): number {
    return Math.round(
      (Date.parse(task.finishDate) - Date.parse(task.startDate)) /
        Config.ONE_DAY
    );
  }
  refresh(): any {
    return new Task();
  }
  testStartDateError(newTask: Task): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Date.parse(newTask.startDate) - today.getTime() < 0) {
      return false;
    } else {
      return true;
    }
  }
  testEndDateError(newTask: Task): boolean {
    if (Date.parse(newTask.finishDate) - Date.parse(newTask.startDate) < 0) {
      return false;
    } else {
      return true;
    }
  }
}
