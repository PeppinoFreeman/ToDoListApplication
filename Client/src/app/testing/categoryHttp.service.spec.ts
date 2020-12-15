import { Config } from '../models/config';
import { CategoryHttpService } from '../services/categoryHttp.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Category } from '../models/category.object';

describe('CategoryHttpService', () => {
  let service: CategoryHttpService;
  let httpMock: HttpTestingController;
  const list = new Category();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryHttpService],
    });
    service = TestBed.inject(CategoryHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Charge le service', () => {
    expect(service).toBeTruthy();
  });

  it('Lance une requête GET vers le serveur', fakeAsync(() => {
    const response = ['Travail', 'Personnel'];
    service.getServerCategories(list);
    const req = httpMock.expectOne(Config.API_ROUTES.category);
    expect(req.request.method).toEqual('GET');
    req.flush(response);
    tick();
  }));

  it('Lance une requête POST vers le serveur', fakeAsync(() => {
    const response = 'Autre';
    service.addServerCategories(list);
    const req = httpMock.expectOne(Config.API_ROUTES.category);
    expect(req.request.method).toEqual('POST');
    req.flush(response);
    tick();
  }));

  it('Lance une requête PUT vers le serveur', fakeAsync(() => {
    const response = 'Perso';
    service.updateServerCategories(list);
    const req = httpMock.expectOne(Config.API_ROUTES.category);
    expect(req.request.method).toEqual('PUT');
    req.flush(response);
    tick();
  }));

  it('Lance une requête DELETE vers le serveur', fakeAsync(() => {
    const response = '';
    service.deleteServerCategories(list);
    const req = httpMock.expectOne(Config.API_ROUTES.categoryDelete);
    expect(req.request.method).toEqual('POST');
    req.flush(response);
    tick();
  }));
});
