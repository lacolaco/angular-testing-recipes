import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Recipe } from './model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  async getRecipes(): Promise<Recipe[]> {
    return this.http
      .get<{ data: Recipe[] }>('/api/recipes')
      .pipe(map((resp) => resp.data))
      .toPromise();
  }
}
