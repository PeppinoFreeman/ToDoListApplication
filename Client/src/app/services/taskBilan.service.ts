import { Injectable } from '@angular/core';
import { Task } from '../models/task.object';

@Injectable()
export class TaskBilanService {
  constructor() {}

  testPeriodError(periodStart: string, periodEnd: string): boolean {
    if (
      Date.parse(periodEnd) - Date.parse(periodStart) < 0 ||
      typeof periodStart === 'undefined' ||
      typeof periodEnd === 'undefined'
    ) {
      return false;
    } else {
      return true;
    }
  }

  showTaskInPeriod(
    task: Task,
    periodStart: string,
    periodEnd: string
  ): boolean {
    if (
      Date.parse(task.finishDate) >= Date.parse(periodStart) &&
      Date.parse(task.finishDate) <= Date.parse(periodEnd) &&
      !task.taskFinished
    ) {
      return true;
    } else {
      return false;
    }
  }

  calc_period_percentage(taskList: Task[], Start: string, End: string): any {
    const counter = [0, 0, 0];
    const periodStart = Date.parse(Start);
    const periodEnd = Date.parse(End);
    const obj = {
      finishedInPeriod: 0,
      unfinishedInPeriod: 0,
      delayFinishedInPeriod: 0,
    };
    let taskCounter = 0;

    for (const i in taskList) {
      if (
        Date.parse(taskList[i].completionDate) >= periodStart &&
        Date.parse(taskList[i].completionDate) <= periodEnd
      ) {
        taskCounter++;
        if (!taskList[i].isLate) {
          counter[0]++;
        } else if (taskList[i].isLate) {
          counter[1]++;
        }
      } else if (this.showTaskInPeriod(taskList[i], Start, End)) {
        counter[2]++;
        taskCounter++;
      }
    }
    if (taskCounter !== 0) {
      obj.finishedInPeriod = (counter[0] / taskCounter) * 100;
      obj.delayFinishedInPeriod = (counter[1] / taskCounter) * 100;
      obj.unfinishedInPeriod = (counter[2] / taskCounter) * 100;
    } else {
      obj.finishedInPeriod = 100;
      obj.delayFinishedInPeriod = 0;
      obj.unfinishedInPeriod = 0;
    }
    return obj;
  }

  calc_global_percentage(taskList: Task[]): any {
    const counter = [0, 0, 0];
    const obj = { finished: 0, unfinished: 0, delayFinished: 0 };
    for (const i in taskList) {
      if (taskList[i].taskFinished) {
        if (!taskList[i].isLate) {
          counter[0]++;
        } else if (taskList[i].isLate) {
          counter[1]++;
        }
      } else if (!taskList[i].taskFinished) {
        counter[2]++;
      }
    }
    obj.finished = (counter[0] / taskList.length) * 100;
    obj.delayFinished = (counter[1] / taskList.length) * 100;
    obj.unfinished = (counter[2] / taskList.length) * 100;
    return obj;
  }
}
