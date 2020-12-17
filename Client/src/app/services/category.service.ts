import { Category } from '../models/category.object';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { CategoryHttpService } from './categoryHttp.service';

@Injectable()
export class CategoryService {
  private CategoryHttpService: CategoryHttpService;
  public Category: Category;
  @Output() updateCategories: EventEmitter<string[]> = new EventEmitter();

  constructor(categoryHttpService: CategoryHttpService) {
    this.Category = new Category();
    this.CategoryHttpService = categoryHttpService;
    this.CategoryHttpService.getServerCategories(this.Category);

    categoryHttpService.update.subscribe((response) => {
      this.updateInTaskList(response[0], response[1]);
    });
  }
  // Récupère l'objet Category
  getCategories(): Category {
    return this.Category;
  }

  // Récupère uniquement les catégories de l'objet
  getListOfCategories(): string[] {
    this.CategoryHttpService.getServerCategories(this.Category);
    return this.Category.categories;
  }

  // Rafraîchit le formulaire
  reset(): void {
    this.Category.selectedCategory = this.Category.categories[
      this.Category.categories.length - 1
    ];
    this.Category.toggleRename = false;
    this.Category.newCategory = '';
  }
  // Ajoute une catégorie
  add(): void {
    this.CategoryHttpService.addServerCategories(this.Category);
    this.reset();
  }
  // Modifie une catégorie
  rename(): void {
    this.CategoryHttpService.updateServerCategories(this.Category);
  }
  // Supprime la catégorie
  delete(): void {
    this.CategoryHttpService.deleteServerCategories(this.Category);
  }
  // Met à jour les catégories dans la liste de tâches
  updateInTaskList(selected: string, New: string): void {
    const sendCategory = [selected, New];
    this.updateCategories.emit(sendCategory);
    this.reset();
  }
}
