import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Task } from '../models/task.object';
import { TestBed } from '@angular/core/testing';
import { TaskFormService } from '../services/taskForm.service';

describe('TaskFormService', () => {
  let service: TaskFormService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskFormService],
    });
    service = TestBed.inject(TaskFormService);
  });

  it('Charge le service', () => {
    expect(service).toBeTruthy();
  });

  it('Calcule la durée', () => {
    const task = new Task();
    const spy = spyOn(service, 'calculateDuration').and.callThrough();

    expect(service.calculateDuration(task)).toBeInstanceOf(Number);
    expect(spy).toHaveBeenCalledWith(task);
  });

  it('Teste la date de début', () => {
    const task = new Task();
    const spy = spyOn(service, 'testStartDateError').and.callThrough();

    expect(service.testStartDateError(task)).toBeInstanceOf(Boolean);
    expect(service.testStartDateError(task)).toBeTrue();
    expect(spy).toHaveBeenCalledWith(task);

    task.startDate = '2000-10-10';
    expect(service.testStartDateError(task)).toBeFalse();
    expect(spy).toHaveBeenCalledWith(task);
  });

  it('Teste la date de fin', () => {
    const task = new Task();
    const spy = spyOn(service, 'testEndDateError').and.callThrough();

    expect(service.testEndDateError(task)).toBeInstanceOf(Boolean);
    expect(service.testEndDateError(task)).toBeTrue();
    expect(spy).toHaveBeenCalledWith(task);

    task.startDate = '2002-10-10';
    task.finishDate = '2000-10-10';
    expect(service.testEndDateError(task)).toBeFalse();
    expect(spy).toHaveBeenCalledWith(task);
  });
});
