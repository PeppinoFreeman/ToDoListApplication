import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Task } from '../models/task.object';
import { TaskDelayService } from '../services/taskDelay.service';
import { TestBed } from '@angular/core/testing';

describe('TaskDelayService', () => {
  let service: TaskDelayService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskDelayService],
    });
    service = TestBed.inject(TaskDelayService);
  });

  it('Charge le service', () => {
    expect(service).toBeTruthy();
  });

  it(`Retourne la date actuelle`, () => {
    expect(service.getDate()).toBeInstanceOf(Date);
  });

  it(`Renvoie la journée suivante`, () => {
    expect(service.nextDay()).toBeInstanceOf(Date);
  });

  it(`Calcule la durée restante`, () => {
    const task = new Task();
    expect(service.calculateRemainDuration(task)).toBeInstanceOf(Number);
  });

  it(`Vérifie et calcule les retards`, () => {
    const tasks = [new Task(), new Task(), new Task(), new Task()];
    tasks[0].type = 'Ponctuel';
    tasks[1].type = 'Ponctuel';
    tasks[2].type = 'Long cours';
    tasks[3].type = 'Long cours';
    tasks[1].finishDate = '2000-10-10';
    tasks[3].finishDate = '2000-10-10';
    expect(service.calculateDelay(tasks[0])).toBeInstanceOf(Number);
    expect(service.calculateDelay(tasks[2])).toBeInstanceOf(Number);
    service.checkDelays(tasks);
    expect(tasks[0].isLate).toBeFalse();
    expect(tasks[1].isLate).toBeTrue();
    expect(tasks[2].isLate).toBeFalse();
    expect(tasks[3].isLate).toBeTrue();
  });
});
