import { map } from 'rxjs/operators';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Config } from '../models/config';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.object';

@Injectable()
export class CategoryHttpService {
  private Http: HttpClient;
  @Output() update: EventEmitter<any> = new EventEmitter();

  constructor(Http: HttpClient) {
    this.Http = Http;
  }
  // Récupère la liste des catégories du serveur
  getServerCategories(category: Category): any {
    this.Http.get(Config.API_ROUTES.category)
      .pipe(
        map((response: any[]) => {
          for (let i = 0; i < response.length; i++) {
            category.categories[i] = response[i].category;
          }
        })
      )
      .subscribe();
  }
  // Ajoute une nouvelle catégorie sur le serveur
  addServerCategories(category: Category): any {
    const newCategory = category.newCategory;
    this.Http.post(Config.API_ROUTES.category, { newCategory })
      .pipe(
        map((response: any) => {
          category.categories.push(response.category);
        })
      )
      .subscribe();
  }
  // Met à jour catégorie existante sur le serveur
  updateServerCategories(category: Category): any {
    const selectedCategory = category.selectedCategory;
    const newCategory = category.newCategory;
    this.Http.put(Config.API_ROUTES.category, { selectedCategory, newCategory })
      .pipe(
        map((response: any) => {
          const ctg = category.categories;
          ctg[ctg.indexOf(selectedCategory)] = newCategory;
          this.updateInTaskList(selectedCategory, category.newCategory);
        })
      )
      .subscribe();
  }
  // Supprime une catégorie sur le serveur
  deleteServerCategories(category: Category): any {
    const selectedCategory = category.selectedCategory;
    this.Http.post(Config.API_ROUTES.categoryDelete, { selectedCategory })
      .pipe(
        map((response: any) => {
          const ctg = category.categories;
          ctg.splice(ctg.indexOf(selectedCategory), 1);
          this.updateInTaskList(selectedCategory, '');
        })
      )
      .subscribe();
  }

  updateInTaskList(selectedCategory: string, newCategory: string): void {
    const sendCategory = [selectedCategory, newCategory];
    this.update.emit(sendCategory);
  }
}
