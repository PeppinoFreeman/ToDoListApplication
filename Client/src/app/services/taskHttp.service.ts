import { Task } from './../models/task.object';
import { map } from 'rxjs/operators';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Config } from '../models/config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TaskHttpService {
  private Http: HttpClient;
  private taskList: Task[];
  @Output() update: EventEmitter<any> = new EventEmitter();

  constructor(Http: HttpClient) {
    this.Http = Http;
  }

  // Récupère la collection du serveur
  getServerTaskList(): any {
    this.Http.get(Config.API_ROUTES.collection)
      .pipe(
        map((response: Task[]) => {
          this.taskList = response;
          this.updateTaskList();
          console.log(this.taskList);
        })
      )
      .subscribe();
  }
  // Envoie la collection au serveur
  addToServerTaskList(taskList: Task[], newTask: Task): any {
    this.Http.post(Config.API_ROUTES.collection, newTask)
      .pipe(
        map((response: Task) => {
          taskList.push(response);
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

  updateTaskList(): void {
    this.update.emit();
  }
}
