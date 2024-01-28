// calendar.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Event } from '../interfaces/calendar.interface';


@Injectable({
  providedIn: 'root'
})

export class EventsService {
  private apiUrl: string = 'http://localhost:8000/api/events';
  eventAdded = new Subject<Event>();

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        throw new Error(`Error al obtener el evento con id ${id}: ${error}`);
      })
    );
  }

  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event).pipe(
      tap((newEvent) => this.eventAdded.next(newEvent))
    );
  }

  updateEvent(event: Event): Observable<Event> {
    if (!event.id) throw new Error('Event id is required');
    return this.http.patch<Event>(`${this.apiUrl}/${event.id}`, event);
  }

  deleteEventById(id: number): Observable<void> {
    console.log(id);

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        throw new Error(`Error al eliminar el evento con id ${id}: ${error}`);
      })
    );
  }
}
