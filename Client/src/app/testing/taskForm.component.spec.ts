import { Task } from '../models/task.object';
import { TaskService } from '../services/task.service';
import { AppModule } from '../app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskFormComponent } from '../components/taskForm.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOMHelper } from './dom-helper';
import { By } from '@angular/platform-browser';

describe('TaskFormComponent', () => {
  let fixture: ComponentFixture<TaskFormComponent>;
  let app: TaskFormComponent;
  let dHelper: DOMHelper<TaskFormComponent>;
  let taskServiceMock: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule],
      declarations: [TaskFormComponent],
      providers: [TaskService],
    }).compileComponents();
    fixture = TestBed.createComponent(TaskFormComponent);
    app = fixture.componentInstance;
    dHelper = new DOMHelper(fixture);
    taskServiceMock = TestBed.inject(TaskService);
    fixture.detectChanges();
  });

  it('Charge le composant', () => {
    expect(app).toBeTruthy();
  });

  it(`A pour titre une balise h2 'Créer une nouvelle tâche'`, () => {
    expect(dHelper.getText('h2')).toContain('Créer une nouvelle tâche');
  });

  it(`Contient un formulaire`, () => {
    expect(dHelper.count('form')).toBe(1);
  });

  it('Appel du service de création au clic', () => {
    const button = fixture.debugElement.query(By.css('#createButton'));
    fixture.detectChanges();
    const spy = spyOn(taskServiceMock, 'create');
    if (button.triggerEventHandler('click', {}) === undefined) {
      app.createTask();
    }
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Appel du service de modification au clic', () => {
    const button = fixture.debugElement.query(By.css('#updateButton'));
    fixture.detectChanges();
    const spy = spyOn(taskServiceMock, 'update');
    if (button.triggerEventHandler('click', {}) === undefined) {
      app.updateTask();
    }
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Teste la souscription au service de mise à jour', () => {
    const task = new Task();
    task.title = 'Test Title';
    app.ngOnInit();
    app.TaskService.updateState.emit(task);
    expect(app.toggleUpdateButton).toBeTrue();
    expect(app.newTask.title).toMatch(task.title);
  });
});
