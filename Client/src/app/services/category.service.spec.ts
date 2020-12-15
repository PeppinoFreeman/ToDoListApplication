import { CategoryHttpService } from './categoryHttp.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from './../app.module';
import { CategoryService } from './category.service';
import { TestBed } from '@angular/core/testing';

describe('CategoryService', () => {
  let service: CategoryService;
  let serviceHttp: CategoryHttpService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
      providers: [CategoryService, CategoryHttpService],
    });
    service = TestBed.inject(CategoryService);
    serviceHttp = TestBed.inject(CategoryHttpService);
  });

  it('Charge le service', () => {
    expect(service).toBeTruthy();
  });

  it(`Remet à zéro le formulaire`, () => {
    service.reset();
    expect(service.Category.toggleRename).toBeFalse();
    expect(service.Category.newCategory).toEqual('');
  });

  it(`Appelle le service d'ajout`, () => {
    const spy = spyOn(service, 'reset');
    const spy2 = spyOn(serviceHttp, 'addServerCategories');
    service.add();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it(`Appelle le service de mise à jour`, () => {
    const spy = spyOn(serviceHttp, 'updateServerCategories');
    service.rename();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`Appelle le service de suppression`, () => {
    const spy = spyOn(serviceHttp, 'deleteServerCategories');
    service.delete();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`Met à jour les catégories dans la liste des tâches`, () => {
    const spy = spyOn(service, 'reset');
    service.updateInTaskList('Hello', 'A');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Teste la souscription à la mise à jour', () => {
    const send = ['message1', 'message2'];
    const spy = spyOn(service, 'updateInTaskList');
    serviceHttp.update.emit(send);
    expect(spy).toHaveBeenCalledOnceWith(send[0], send[1]);
  });
});
