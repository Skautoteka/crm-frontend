import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { InputConfig } from '@skautoteka-frontend/ui';
import { IModelResponse } from '@skautoteka-frontend/common';

@Injectable({ providedIn: 'root' })
export class UsersHttpService {
  constructor(private http: HttpClient) {}

  /**
   * Post http request that adds a new user.
   *
   * @param user
   */
  public addUser$(user: User): Observable<IModelResponse<User>> {
    return this.http.post<IModelResponse<User>>('api/auth/register/', { ...user });
  }

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

  /**
   * Gets create fields for user model.
   */
  public getCreateFieldsConfig$(): Observable<InputConfig> {
    return this.http.get<InputConfig>('api/user/create-fields');
  }
}
