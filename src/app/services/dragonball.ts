import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragonballService {
  private baseUrl = 'https://dragonball-api.com/api/characters';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1, limit: number = 10): Observable<any> {
    const url = `${this.baseUrl}?page=${page}&limit=${limit}`;
    return this.http.get(url);
  }
}
