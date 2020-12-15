export class Config {
  public static get API_ROUTES(): any {
    return {
      collection: '/collection',
      collection2: '/collection2',
      category: '/category_list',
      categoryDelete: '/category_delete',
    };
  }
  public static get TITLE(): string {
    return 'ToDoListApplication';
  }
  public static get ONE_DAY(): number {
    return 24 * 3600 * 1000;
  }
}
