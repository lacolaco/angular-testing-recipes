import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from './model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);

  async getRecipes(): Promise<Recipe[]> {
    return lastValueFrom(this.http.get<{ data: Recipe[] }>('/api/recipes').pipe(map((resp) => resp.data)));
  }
}
