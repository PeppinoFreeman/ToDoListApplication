import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from './../app.module';
import { Task } from './../models/task.object';
import { TaskEditService } from './taskEdit.service';
import { TestBed } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';

describe('TaskEditService', () => {
  let service: TaskEditService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AppModule,HttpClientTestingModule],
      providers: [TaskEditService],
    });
    service = TestBed.inject(TaskEditService);
  });

  it('Charge le service', () => {
    expect(service).toBeTruthy();
  });

  it(`Modifie l'état de complétion d'une tâche ponctuelle`, () => {
    const task = new Task();
    task.taskFinished = false;
    service.toggleState(task, new Date());
    expect(task.taskPercentage).toEqual(100);
    task.taskFinished = true;
    service.toggleState(task, new Date());
    expect(task.taskPercentage).toEqual(0);
  });

  it(`Modifie le % de complétion d'une tâche long cours`, () => {
    const task = new Task();
    task.finishDate = '2200-10-10';
    task.taskPercentage = 100;
    service.updatePercentage(task, new Date());
    expect(task.taskFinished).toBeTrue();
    expect(task.isLate).toBeFalse();
  });

  it(`navigue vers le formulaire de modification d'une tâche`, () => {
    const task = new Task();
    const update: EventEmitter<Task> = new EventEmitter();

    const spy = spyOn(service, 'toggleUpdateForm')
      .withArgs(task, update)
      .and.callThrough();
    service.toggleUpdateForm(task, update);
    expect(spy).toHaveBeenCalled();
  });
});
