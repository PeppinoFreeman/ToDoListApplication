import { CategoryService } from './../services/category.service';
import { AppModule } from './../app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryComponent } from './category.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { routes } from './../app-routing.module';
import { DOMHelper } from '../dom-helper';
import { By } from '@angular/platform-browser';

describe('CategoryComponent', () => {
  let fixture: ComponentFixture<CategoryComponent>;
  let app: CategoryComponent;
  let dHelper: DOMHelper<CategoryComponent>;
  let categoryServiceMock: CategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [CategoryComponent],
      providers: [CategoryService],
    }).compileComponents();
    fixture = TestBed.createComponent(CategoryComponent);
    app = fixture.componentInstance;
    dHelper = new DOMHelper(fixture);
    categoryServiceMock = TestBed.inject(CategoryService);
    fixture.detectChanges();
  });

  it('Charge le composant', () => {
    expect(app).toBeTruthy();
  });

  it(`A pour titre une balise h2 'Liste des catégories'`, () => {
    expect(dHelper.getText('h2')).toContain('Liste des catégories');
  });

  it(`Contient un formulaire`, () => {
    expect(dHelper.count('form')).toBe(1);
  });

  it('Appel du service de création au clic', () => {
    const button = fixture.debugElement.query(By.css('#createButton'));
    fixture.detectChanges();
    const spy = spyOn(categoryServiceMock, 'add');
    button.triggerEventHandler('click', {});
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('Appel du service de suppression au clic', () => {
    const button = fixture.debugElement.query(By.css('#renameButton'));
    fixture.detectChanges();
    const spy = spyOn(categoryServiceMock, 'rename');
    button.triggerEventHandler('click', {});
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('Appel du service de modification au clic', () => {
    const button = fixture.debugElement.query(By.css('#deleteButton'));
    fixture.detectChanges();
    const spy = spyOn(categoryServiceMock, 'delete');
    button.triggerEventHandler('click', {});
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
