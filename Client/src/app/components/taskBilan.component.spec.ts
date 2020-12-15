import { Task } from './../models/task.object';
import { TaskService } from './../services/task.service';
import { AppModule } from './../app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskBilanComponent } from './taskBilan.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOMHelper } from '../dom-helper';

describe('TaskBilanComponent', () => {
  let fixture: ComponentFixture<TaskBilanComponent>;
  let app: TaskBilanComponent;
  let dHelper: DOMHelper<TaskBilanComponent>;
  let taskServiceMock: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
      declarations: [TaskBilanComponent],
      providers: [TaskService],
    }).compileComponents();
    fixture = TestBed.createComponent(TaskBilanComponent);
    app = fixture.componentInstance;
    dHelper = new DOMHelper(fixture);
    taskServiceMock = TestBed.inject(TaskService);
    fixture.detectChanges();
  });

  it('Charge le composant', () => {
    expect(app).toBeTruthy();
  });

  it(`A pour titre une balise h2 'Bilan'`, () => {
    expect(dHelper.getText('h2')).toContain('Bilan');
  });

  it('Appel du service', () => {
    const task = new Task();
    fixture.detectChanges();
    const spy = spyOn(taskServiceMock, 'showTaskInPeriod');
    const spy2 = spyOn(
      taskServiceMock,
      'calc_periodic_percentage'
    ).and.returnValues(0, 0, 0);
    const spy3 = spyOn(
      taskServiceMock,
      'calc_global_percentage'
    ).and.returnValues(0, 0, 0);
    const spy4 = spyOn(taskServiceMock, 'testPeriodError').and.returnValue(
      true
    );

    app.showTaskInPeriod(task);
    app.testPeriodError();
    app.calc_global_percentage();
    app.calc_period_percentage();

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
    expect(spy4).toHaveBeenCalled();
  });

  it('Teste la souscription au service de mise à jour', () => {
    const tasks = [new Task()];
    const spy = spyOn(app, 'calc_global_percentage');
    tasks[0].title = 'Test Title';
    app.ngOnInit();
    taskServiceMock.updateList.emit(tasks);
    expect(app.taskList[0].title).toMatch(tasks[0].title);
    expect(spy).toHaveBeenCalled();
  });
});
