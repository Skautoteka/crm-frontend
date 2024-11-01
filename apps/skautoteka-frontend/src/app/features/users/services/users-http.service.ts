import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class UsersHttpService {
  constructor(private http: HttpClient) {}

  /**
   * Retrieves all users from the database.
   *
   * @returns
   */
  public getAllUsers$(): Observable<User[]> {
    return this.http.get<User[]>('api/user/all');
  }

  /**
   * Removes task from database.
   *
   * @param id
   * @returns
   */
  public removeUser$(id: string): Observable<void> {
    return this.http.delete<void>('api/user/' + id);
  }
}
