import { TaskService } from '../services/task.service';
import { AppModule } from '../app.module';
import { TaskListComponent } from '../components/taskList.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DOMHelper } from './dom-helper';
import { Task } from '../models/task.object';

describe('TaskListComponent', () => {
  let fixture: ComponentFixture<TaskListComponent>;
  let app: TaskListComponent;
  let dHelper: DOMHelper<TaskListComponent>;
  let taskServiceMock: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
      declarations: [TaskListComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TaskListComponent);
    app = fixture.componentInstance;
    dHelper = new DOMHelper(fixture);
    taskServiceMock = TestBed.inject(TaskService);
    fixture.detectChanges();
  });

  it('Charge le composant', () => {
    expect(app).toBeTruthy();
  });

  it(`A pour titre une balise h2 'Liste des tâches'`, () => {
    expect(dHelper.getText('h2')).toContain('Liste des tâches');
  });

  it('Validation du pourcentage par un service au clic', () => {
    const task = new Task();
    fixture.detectChanges();
    const spy = spyOn(taskServiceMock, 'updatePercentage');
    app.updateTaskPercentage(task);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Appel du service de modification au clic', () => {
    const task = new Task();
    fixture.detectChanges();
    const spy = spyOn(taskServiceMock, 'toggleUpdateForm');
    app.toggleUpdateTask(task, 0);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Appel du service lorsque la case est cochée', () => {
    const task = new Task();
    fixture.detectChanges();
    const spy = spyOn(taskServiceMock, 'toggleState');
    app.toggleTaskState(task);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Appel du service de calcul de la durée restante', () => {
    const task = new Task();
    fixture.detectChanges();
    const spy = spyOn(taskServiceMock, 'calculateRemainDuration');
    app.getRemainingDuration(task);
    expect(spy).toHaveBeenCalled();
  });
});
