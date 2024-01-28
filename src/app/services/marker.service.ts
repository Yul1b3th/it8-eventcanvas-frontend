// appmarker.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { AppMarker } from '../interfaces/map.interfaces';


@Injectable({
  providedIn: 'root'
})
export class MarkersService {
  private apiUrl: string = 'http://localhost:8000/api/markers';
  markerAdded = new Subject<AppMarker>();

  constructor(private http: HttpClient) { }

  getMarkers(): Observable<AppMarker[]> {
    return this.http.get<AppMarker[]>(this.apiUrl);
  }


  getMarkerById(id: string): Observable<AppMarker> {
    return this.http.get<AppMarker>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        throw new Error(`Error al obtener el usuario con id ${id}: ${error}`);
      })
    );
  }



  /*   addMarker(marker: AppMarker): Observable<AppMarker> {
      return this.http.post<AppMarker>(`${this.apiUrl}`, marker);
    } */
  addMarker(marker: AppMarker): Observable<AppMarker> {
    return this.http.post<AppMarker>(`${this.apiUrl}`, marker).pipe(
      tap((newMarker) => {
        this.markerAdded.next(newMarker); // Emite el nuevo marcador
      }),
      catchError((error) => {
        throw new Error(`Error al agregar el marcador: ${error}`);
      })
    );
  }

  updateMarker(appmarker: AppMarker): Observable<AppMarker> {
    if (!appmarker.id) throw new Error('AppMarker id is required');
    return this.http.patch<AppMarker>(`${this.apiUrl}/${appmarker.id}`, appmarker);
  }

  deleteMarkerById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        throw new Error(`Error al eliminar el usuario con id ${id}: ${error}`);
      })
    );
  }
}
