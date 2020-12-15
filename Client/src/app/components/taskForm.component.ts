import { CategoryService } from './../services/category.service';
import { TaskService } from './../services/task.service';
import { Task } from './../models/task.object';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './taskForm.component.html',
  styles: [
    `
      span {
        color: red;
        font-style: italic;
      }
    `,
  ],
})
export class TaskFormComponent implements OnInit{
  public newTask: Task;
  public TaskService: TaskService;
  public categories: string[];

  public toggleUpdateButton: boolean;

  constructor(taskService: TaskService, categoryService: CategoryService) {
    this.TaskService = taskService;
    this.refreshTask();
    this.categories = categoryService.getListOfCategories();
    this.toggleUpdateButton = false;
  }
  ngOnInit(): void {
    this.TaskService.updateState.subscribe((response: Task) => {
      this.newTask = response;
      this.toggleUpdateButton = true;
    });
  }

  // Vide le formulaire
  refreshTask(): void {
    this.newTask = this.TaskService.refresh();
  }
  // Ajoute une nouvelle tâche à la liste
  createTask(): void {
    this.TaskService.create(this.newTask);
    this.refreshTask();
  }
  // Modifie la tâche sélectionnée
  updateTask(): void {
    this.TaskService.update(this.newTask);
    this.toggleUpdateButton = false;
    this.refreshTask();
  }
  // Test que la date de début est plus grande qu'aujourd'hui
  testStartDateError(newTask: Task): boolean {
    return this.TaskService.testStartDateError(newTask);
  }
  // Test que la date de fin est plus grande que la date de début
  testEndDateError(newTask: Task): boolean {
    return this.TaskService.testEndDateError(newTask);
  }
}
