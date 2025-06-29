import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    });
    service = TestBed.inject(ApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('service is created', () => {
    expect(service).toBeTruthy();
  });

  it('getRecipes() makes GET request to "/api/recipes"', () => {
    service.getRecipes();

    const req = httpController.expectOne('/api/recipes');
    expect(req.request.method).toBe('GET');
  });

  it('getRecipes() retrieves recipes from response json', async () => {
    const data = [
      { id: 1, name: 'recipe1' },
      { id: 2, name: 'recipe2' },
    ];
    const callback = jasmine.createSpy();

    const promise = service.getRecipes().then(callback);

    const req = httpController.expectOne('/api/recipes');
    req.flush({ data });

    await promise.then(() => expect(callback).toHaveBeenCalledWith(data));
  });
});
