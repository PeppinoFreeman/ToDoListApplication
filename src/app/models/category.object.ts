export class Category {
  public categories: string[];
  public newCategory: string;
  public selectedCategory: string;
  public toggleRename: boolean;

  constructor() {
    this.categories = [];
    this.newCategory = '';
    this.selectedCategory = '';
    this.toggleRename = false;
  }
}
