import { Task } from './../models/task.object';
import { Config } from './../models/config';
import { Injectable } from '@angular/core';

@Injectable()
export class TaskDelayService {
  private actualDate: Date;
  constructor() {
    this.actualDate = new Date();
  }

  getDate(): Date {
    return this.actualDate;
  }

  nextDay(): Date {
    this.actualDate.setTime(this.actualDate.getTime() + Config.ONE_DAY);
    console.log(this.actualDate);
    return this.actualDate;
  }

  calculateRemainDuration(task: Task): number {
    return Math.round(
      (Date.parse(task.finishDate) - this.actualDate.getTime()) / Config.ONE_DAY
    );
  }

  calculateDelay(task: Task): number {
    const actualDateWoTimeStamp = this.actualDate;
    actualDateWoTimeStamp.setHours(0, 0, 0, 0);
    if (task.type === 'Ponctuel') {
      return Date.parse(task.finishDate) - actualDateWoTimeStamp.getTime();
    } else {
      return (
        ((task.duration -
          (Date.parse(task.finishDate) - actualDateWoTimeStamp.getTime()) /
            Config.ONE_DAY) /
          task.duration) *
        100
      );
    }
  }

  checkDelays(taskList: Task[]): void {
    for (const i in taskList) {
      if (taskList[i].type === 'Ponctuel') {
        if (this.calculateDelay(taskList[i]) < 0) {
          taskList[i].isLate = true;
        } else {
          taskList[i].isLate = false;
        }
      } else if (taskList[i].type === 'Long cours') {
        if (this.calculateDelay(taskList[i]) > taskList[i].taskPercentage) {
          taskList[i].isLate = true;
        } else {
          taskList[i].isLate = false;
        }
      }
    }
  }
}
