import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Task } from './../models/task.object';
import { TaskBilanService } from './taskBilan.service';
import { TestBed } from '@angular/core/testing';

describe('TaskBilanService', () => {
  let service: TaskBilanService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskBilanService],
    });
    service = TestBed.inject(TaskBilanService);
  });

  it('Charge le service', () => {
    expect(service).toBeTruthy();
  });

  it(`Teste la cohérence entre les dates saisies`, () => {
    expect(service.testPeriodError('', '')).toBeInstanceOf(Boolean);
    expect(service.testPeriodError('', undefined)).toBeFalse();
    expect(service.testPeriodError('', '')).toBeTrue();
  });

  it(`Affiche les tâches de la période saisie`, () => {
    const task = new Task();
    task.finishDate = '2000-10-10';
    expect(service.showTaskInPeriod(task, '', '')).toBeInstanceOf(Boolean);
    expect(
      service.showTaskInPeriod(task, '2000-10-9', '2000-10-12')
    ).toBeTrue();
    expect(
      service.showTaskInPeriod(task, '2001-10-9', '2001-10-12')
    ).toBeFalse();
  });

  it(`Calcule les pourcentages globaux`, () => {
    const tasks = [new Task(), new Task(), new Task()];
    tasks[0].taskFinished = true;
    tasks[0].isLate = true;
    tasks[1].taskFinished = true;
    tasks[1].isLate = false;
    tasks[2].taskFinished = false;
    expect(service.calc_global_percentage(tasks)).toBeInstanceOf(Object);
  });

  it(`Calcule les pourcentages périodiques`, () => {
    const tasks = [new Task(), new Task()];
    tasks[0].completionDate = '2000-10-10';
    tasks[0].isLate = false;
    tasks[1].completionDate = '2000-10-10';
    tasks[1].isLate = true;
    expect(
      service.calc_period_percentage(tasks, '2000-10-9', '2000-10-12')
    ).toBeInstanceOf(Object);
  });
});
