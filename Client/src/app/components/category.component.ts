import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.object';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit{
  public Category: Category;
  private CategoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.CategoryService = categoryService;
  }
  ngOnInit(): void {
    this.Category = this.CategoryService.getCategories();
  }

  // Pour supprimer une catégorie
  deleteCategory(): void {
    this.CategoryService.delete();
  }
  // Pour renommer une catégorie
  renameCategory(): void {
    this.CategoryService.rename();
  }
  // Pour ajouter une catégorie
  createCategory(): void {
    this.CategoryService.add();
  }
}
