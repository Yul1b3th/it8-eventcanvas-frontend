import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl: string = 'http://localhost:8080/api/usuarios';
  userAdded = new Subject<User>();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        throw new Error(`Error al obtener el usuario con id ${id}: ${error}`);
      })
    );
  }

  addUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.apiUrl, user)
      .pipe(tap((newUser) => this.userAdded.next(newUser)));
  }

  updateUser(user: User): Observable<User> {
    if (!user.id) throw new Error('User id is required');
    return this.http.patch<User>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUserById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        throw new Error(`Error al eliminar el usuario con id ${id}: ${error}`);
      })
    );
  }
}
