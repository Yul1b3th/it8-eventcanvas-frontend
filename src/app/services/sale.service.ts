import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Sale } from '../interfaces/sales.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private apiUrl: string = 'http://localhost:8080/api/sales';

  constructor(private http: HttpClient) {}

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.apiUrl);
  }
}
