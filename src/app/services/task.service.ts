/// SERVICES
import { TaskFormService } from './taskForm.service';
import { TaskDelayService } from './taskDelay.service';
import { TaskEditService } from './taskEdit.service';
import { TaskBilanService } from './taskBilan.service';
import { CategoryService } from './category.service';
import { HttpClient } from '@angular/common/http';

/// MODULES
import { Task } from './../models/task.object';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Config } from './../models/config';
import { map } from 'rxjs/operators';

@Injectable()
export class TaskService {
  private Http: HttpClient;
  private TaskEditService: TaskEditService;
  private TaskDelayService: TaskDelayService;
  private TaskFormService: TaskFormService;
  private TaskBilanService: TaskBilanService;
  private index: number;
  public taskList: Task[];

  @Output() updateList: EventEmitter<Task[]> = new EventEmitter();
  @Output() updateState: EventEmitter<Task> = new EventEmitter();

  constructor(
    categoryService: CategoryService,
    Http: HttpClient,
    taskEditService: TaskEditService,
    taskDelayService: TaskDelayService,
    taskFormService: TaskFormService,
    taskBilanService: TaskBilanService
  ) {
    this.index = 0;
    this.Http = Http;
    this.TaskEditService = taskEditService;
    this.TaskDelayService = taskDelayService;
    this.TaskFormService = taskFormService;
    this.TaskBilanService = taskBilanService;
    this.getServerTaskList();

    // Intercepte les changements de catégories
    categoryService.updateCategories.subscribe((response: string[]) => {
      this.updateCategory(response[0], response[1]);
    });
  }

  /// PARTIE COMMUNICATION AVEC LE SERVEUR ///
  // Récupère la collection du serveur
  getServerTaskList(): any {
    this.Http.get(Config.API_ROUTES.collection)
      .pipe(
        map((response: Task[]) => {
          this.taskList = response;
          this.updateTaskList();
        })
      )
      .subscribe();
  }
  // Envoie la collection au serveur
  addToServerTaskList(newTask: Task): any {
    this.Http.post(Config.API_ROUTES.collection, newTask)
      .pipe(
        map((response: Task) => {
          this.taskList.push(response);
          this.updateTaskList();
        })
      )
      .subscribe();
  }
  // Met à jour un élément de la collection sur le serveur
  updateInServerTaskList(newTask: Task): any {
    // this.index = this.taskList.indexOf(newTask);
    this.Http.put(Config.API_ROUTES.collection, newTask)
      .pipe(
        map((response: Task) => {
          this.updateTaskList();
        })
      )
      .subscribe();
  }
  // Met à jour TOUTE la collection sur le serveur
  updateInServerWHOLETaskList(taskList: Task[]): any {
    this.Http.put(Config.API_ROUTES.collection2, taskList)
      .pipe(
        map(() => {
          this.updateTaskList();
        })
      )
      .subscribe();
  }
  /// PARTIE FORMULAIRE TACHE ///
  // Vide le formulaire
  refresh(): Task {
    return this.TaskFormService.refresh();
  }
  // Ajoute une nouvelle tâche
  create(newTask: Task): void {
    newTask.duration = this.TaskFormService.calculateDuration(newTask);
    this.addToServerTaskList(newTask);
  }
  // Modifie une tâche existante
  update(newTask: Task): void {
    this.taskList[this.index] = newTask;
    this.taskList[this.index].duration = this.TaskFormService.calculateDuration(
      newTask
    );
    this.updateInServerTaskList(newTask);
  }
  // Test que la date de début est plus grande qu'aujourd'hui
  testStartDateError(newTask: Task): boolean {
    return this.TaskFormService.testStartDateError(newTask);
  }
  // Test que la date de fin est plus grande que la date de début
  testEndDateError(newTask: Task): boolean {
    return this.TaskFormService.testEndDateError(newTask);
  }
  /// PARTIE EDITION TACHE ///
  // Modifie l'état de complétion d'une tâche ponctuelle
  toggleState(selectedTask: Task): void {
    this.TaskEditService.toggleState(
      selectedTask,
      this.TaskDelayService.getDate()
    );
    this.updateInServerTaskList(selectedTask);
  }
  // Modifie le pourcentage de complétion d'une tâche long cours
  updatePercentage(selectedTask: Task): void {
    this.TaskEditService.updatePercentage(
      selectedTask,
      this.TaskDelayService.getDate()
    );
    this.updateInServerTaskList(selectedTask);
  }
  // Transforme le form de création d'une tâche en form de mise à jour
  toggleUpdateForm(selectedTask: Task, index: number): void {
    this.index = index;
    this.TaskEditService.toggleUpdateForm(selectedTask, this.updateState);
  }

  /// PARTIE GESTION DE RETARDS ///
  // Passe au jour suivant
  nextDay(): Date {
    const actualDate = this.TaskDelayService.nextDay();
    this.checkDelays();
    this.updateTaskList();
    return actualDate;
  }
  // Vérifie l'état des retards
  checkDelays(): void {
    this.TaskDelayService.checkDelays(this.taskList);
  }

  /// PARTIE ORGANISATION DES TACHES ///
  // Calcule la durée restante à la tâche
  calculateRemainDuration(task: Task): number {
    return this.TaskDelayService.calculateRemainDuration(task);
  }
  // Organise les tâches par ordre décroissant d'urgence
  sortList(): void {
    const duration: number[] = [];
    for (let i = 0; i < this.taskList.length; i++) {
      duration[i] = this.calculateRemainDuration(this.taskList[i]);
      this.taskList.sort(
        (a, b) =>
          this.TaskDelayService.calculateRemainDuration(a) -
          this.calculateRemainDuration(b)
      );
    }
  }
  /// PARTIE BILAN ///
  // Teste la cohérence entre les dates de la période
  testPeriodError(startPeriod: string, endPeriod: string): boolean {
    return this.TaskBilanService.testPeriodError(startPeriod, endPeriod);
  }
  // Affiche les tâches dûes dans la période
  showTaskInPeriod(
    task: Task,
    startPeriod: string,
    endPeriod: string
  ): boolean {
    return this.TaskBilanService.showTaskInPeriod(task, startPeriod, endPeriod);
  }
  // Calcule les taux de toutes les tâches
  calc_global_percentage(taskList: Task[]): any {
    return this.TaskBilanService.calc_global_percentage(taskList);
  }
  // Calcule les taux des tâches de la période saisie
  calc_periodic_percentage(
    taskList: Task[],
    startPeriod: string,
    endPeriod: string
  ): any {
    return this.TaskBilanService.calc_period_percentage(
      taskList,
      startPeriod,
      endPeriod
    );
  }
  /// PARTIE MISE A JOUR DE L'APPLICATION ///
  // Met à jour les catégories renommées de la liste de tâche
  updateCategory(selectedCategory: string, newCategory: string): void {
    for (const i in this.taskList) {
      if (this.taskList[i].category === selectedCategory) {
        this.taskList[i].category = newCategory;
      }
    }
    this.updateInServerWHOLETaskList(this.taskList);
  }
  // Met à jour la liste des tâches
  updateTaskList(): void {
    this.checkDelays();
    this.sortList();
    this.updateList.emit(this.taskList);
  }
}
