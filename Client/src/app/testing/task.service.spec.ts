import { CategoryService } from '../services/category.service';
import { TaskEditService } from '../services/taskEdit.service';
import { AppModule } from '../app.module';
import { Config } from '../models/config';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, tick, fakeAsync, inject } from '@angular/core/testing';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.object';

describe('TaskService', () => {
  let service: TaskService;
  let serviceEdit: TaskEditService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule],
      providers: [TaskService, TaskEditService],
    });
    service = TestBed.inject(TaskService);
    serviceEdit = TestBed.inject(TaskEditService);
    httpMock = TestBed.inject(HttpTestingController);
    service.taskList = [new Task(), new Task()];
  });

  describe('Création/mise à jour Tâche', () => {
    it('Ajoute une nouvelle tâche', () => {
      const task = new Task();
      const spy = spyOn(service, 'addToServerTaskList');
      service.create(task);
      expect(spy).toHaveBeenCalledOnceWith(task);
    });

    it('Met à jour une tâche existante', () => {
      const task = new Task();
      task.title = 'Test';
      const spy = spyOn(service, 'updateInServerTaskList');
      service.update(task);
      expect(spy).toHaveBeenCalledOnceWith(task);
      expect(service.taskList[0].title).toMatch(task.title);
    });
  });

  describe('Edition Tâche', () => {
    it(`Modifie la complétion d'une tâche ponctuelle`, () => {
      const task = new Task();
      const spy = spyOn(serviceEdit, 'toggleState');
      const spy2 = spyOn(service, 'updateInServerTaskList');
      service.toggleState(task);
      expect(spy).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalledOnceWith(task);
    });

    it(`Modifie la complétion d'une tâche long cours`, () => {
      const task = new Task();
      const spy = spyOn(serviceEdit, 'updatePercentage');
      const spy2 = spyOn(service, 'updateInServerTaskList');
      service.updatePercentage(task);
      expect(spy).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalledOnceWith(task);
    });

    it(`Active le formulaire de modification`, () => {
      const task = new Task();
      const spy = spyOn(serviceEdit, 'toggleUpdateForm');
      service.toggleUpdateForm(task, 0);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Requêtes Http', () => {
    it('Lance une requête GET vers le serveur', fakeAsync(() => {
      const response = [new Task()];
      service.getServerTaskList();
      const req = httpMock.match(Config.API_ROUTES.collection);
      expect(req[1].request.method).toEqual('GET');
      req[1].flush(response);
      tick();
    }));

    it('Lance une requête POST vers le serveur', fakeAsync(() => {
      const response = [new Task()];
      service.addToServerTaskList(response[0]);
      const req = httpMock.match(Config.API_ROUTES.collection);
      expect(req[1].request.method).toEqual('POST');
      req[1].flush(response);
      tick();
    }));

    it('Lance une requête PUT sur un élément vers le serveur', fakeAsync(() => {
      const response = [new Task()];
      service.updateInServerTaskList(response[0]);
      const req = httpMock.match(Config.API_ROUTES.collection);
      expect(req[1].request.method).toEqual('PUT');
      req[1].flush(response);
      tick();
    }));

    it('Lance une requête PUT sur toute la collection vers le serveur', fakeAsync(() => {
      const response = [new Task()];
      service.updateInServerWHOLETaskList(response);
      const req = httpMock.expectOne(Config.API_ROUTES.collection2);
      expect(req.request.method).toEqual('PUT');
      req.flush(response);
      tick();
    }));
  });

  describe('Méthodes avec un retour', () => {
    it('La méthode de passage au jour suivant retoure une date', () => {
      const spy = spyOn(service, 'checkDelays');
      const spy2 = spyOn(service, 'updateTaskList');

      expect(service.nextDay()).toBeInstanceOf(Date);
      expect(spy).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
    });

    it(`Le test d'affichage des tâches périodique du bilan retourne un booléen`, () => {
      expect(service.showTaskInPeriod(new Task(), '', '')).toBeInstanceOf(
        Boolean
      );
    });

    it('Le calcul des % globaux des tâches retourne un objet', () => {
      expect(service.calc_global_percentage([new Task()])).toBeInstanceOf(
        Object
      );
    });

    it('Le calcul des % périodiques des tâches retourne un objet', () => {
      expect(
        service.calc_periodic_percentage([new Task()], '', '')
      ).toBeInstanceOf(Object);
    });
  });
  describe(`Mise à jour de l'application`, () => {
    it('mise à jour des catégories', () => {
      const spy = spyOn(service, 'updateInServerWHOLETaskList');
      service.taskList[0].category = 'Test';

      service.updateCategory('Test', 'Mise à jour');
      expect(service.taskList[0].category).toMatch('Mise à jour');
      expect(spy).toHaveBeenCalledOnceWith(service.taskList);
    });
    it('souscription à la mise à jour', inject(
      [CategoryService],
      (serviceCategory: CategoryService) => {
        const send = ['message1', 'message2'];
        const spy = spyOn(service, 'updateCategory');
        serviceCategory.updateCategories.emit(send);
        expect(spy).toHaveBeenCalledOnceWith(send[0], send[1]);
      }
    ));
  });
});
