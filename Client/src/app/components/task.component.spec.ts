import { Task } from './../models/task.object';
import { TaskService } from './../services/task.service';
import { AppModule } from './../app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskComponent } from './task.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOMHelper } from '../dom-helper';
import { By } from '@angular/platform-browser';

describe('TaskComponent', () => {
  let fixture: ComponentFixture<TaskComponent>;
  let app: TaskComponent;
  let dHelper: DOMHelper<TaskComponent>;
  let taskServiceMock: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
      declarations: [TaskComponent],
      providers: [TaskService],
    }).compileComponents();
    fixture = TestBed.createComponent(TaskComponent);
    taskServiceMock = TestBed.inject(TaskService);
    app = fixture.componentInstance;
    dHelper = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  it('Charge le composant', () => {
    expect(app).toBeTruthy();
  });

  it(`Doit avoir un bouton affichant le contenu 'Passer au jour suivant'`, () => {
    expect(dHelper.count('button')).toBeTruthy();
    expect(dHelper.getText('button')).toContain('Passer au jour suivant');
  });

  it('Passe au jour suivant au clic', () => {
    const button = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
    const spy = spyOn(taskServiceMock, 'nextDay');
    button.triggerEventHandler('click', {});
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Teste la souscription au service de mise à jour', () => {
    const tasks = [new Task()];
    tasks[0].title = 'Test Title';
    app.ngOnInit();
    taskServiceMock.updateList.emit(tasks);
    expect(app.taskList[0].title).toMatch(tasks[0].title);
  });
});
