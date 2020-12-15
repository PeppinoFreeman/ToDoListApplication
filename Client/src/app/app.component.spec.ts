import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { routes } from './app-routing.module';
import { Location } from '@angular/common';
import { DOMHelper } from './dom-helper';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let dHelper: DOMHelper<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    dHelper = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  describe('Chargement', () => {
    it(`Charge l'application`, () => {
      expect(app).toBeTruthy();
    });
    it(`Se trouve sur la page d'accueil au chargement`, () => {
      const location: Location = TestBed.inject(Location);
      expect(location.path()).toBe('');
    });
  });

  describe('HTML', () => {
    it(`A pour titre 'ToDoListApplication'`, () => {
      expect(app.title).toEqual('ToDoListApplication');
    });

    it(`A une barre de navigation`, () => {
      expect(dHelper.count('nav')).toEqual(1);
    });
  });

  describe('Navigation', () => {
    it(`Navigue vers la page d'accueil`, () => {
      expect(dHelper.navigateTo('#routeHome')).toEqual(['/']);
    });

    it('Navigue vers la page de tâche', () => {
      expect(dHelper.navigateTo('#routeTask')).toEqual(['/task']);
    });

    it('Navigue vers la page de catégorie', () => {
      expect(dHelper.navigateTo('#routeCategory')).toEqual(['/category']);
    });

    it('Navigue vers la page de bilan', () => {
      expect(dHelper.navigateTo('#routeSheet')).toEqual(['/sheet']);
    });
  });
});
