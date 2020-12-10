import { Task } from './../models/task.object';
import { TaskService } from './../services/task.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './taskList.component.html',
  styles: [
    `
      label {
        font-weight: bold;
      }
      .late {
        color: red;
        font-weight: bold;
      }
      .notLate {
        text-decoration: underline;
      }
    `,
  ],
})
export class TaskListComponent {
  private TaskService: TaskService;
  @Input() taskList: Task[];
  public isCollapsed: boolean[];

  constructor(taskService: TaskService) {
    this.TaskService = taskService;
    this.isCollapsed = new Array<boolean>(20).fill(true);
  }

  // Modifie l'état de réalisation d'une tâche
  toggleTaskState(selectedTask: Task): void {
    this.TaskService.toggleState(selectedTask);
  }
  // Modifier le pourcentage de complétion d'une tâche
  updateTaskPercentage(selectedTask: Task): void {
    this.TaskService.updatePercentage(selectedTask);
  }
  // Transforme le formulaire de création d'une tâche en formulaire de modification
  toggleUpdateTask(selectedTask: Task, index: number): void {
    this.TaskService.toggleUpdateForm(selectedTask, index);
  }
  // retourne le temps restant d'une tâche
  getRemainingDuration(selectedTask: Task): number {
    return this.TaskService.calculateRemainDuration(selectedTask);
  }
}
