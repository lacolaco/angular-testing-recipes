import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from './model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  async getRecipes(): Promise<Recipe[]> {
    return lastValueFrom(this.http.get<{ data: Recipe[] }>('/api/recipes').pipe(map((resp) => resp.data)));
  }
}
