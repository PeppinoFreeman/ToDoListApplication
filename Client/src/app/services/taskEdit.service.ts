import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Task } from './../models/task.object';

@Injectable()
export class TaskEditService {
  public router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  // Modifie l'état de complétion d'une tâche ponctuelle
  toggleState(selectedTask: Task, actualDate: Date): void {
    selectedTask.taskFinished = !selectedTask.taskFinished;
    if (selectedTask.taskFinished) {
      selectedTask.taskPercentage = 100;
      selectedTask.completionDate = actualDate.toDateString();
    } else {
      selectedTask.taskPercentage = 0;
    }
  }
  // Modifie le pourcentage de complétion d'une tâche long cours
  updatePercentage(selectedTask: Task, actualDate: Date): void {
    if (selectedTask.taskPercentage === 100) {
      selectedTask.taskFinished = true;
      selectedTask.completionDate = actualDate.toDateString();
      if (
        Date.parse(selectedTask.completionDate) <=
        Date.parse(selectedTask.finishDate)
      ) {
        selectedTask.isLate = false;
      }
    }
  }
  // Transforme le form de création d'une tâche en form de mise à jour
  toggleUpdateForm(selectedTask: Task, updateState: EventEmitter<Task>): void {
    this.router.navigate(['task']).then(() => {
      updateState.emit(selectedTask);
    });
  }
}
