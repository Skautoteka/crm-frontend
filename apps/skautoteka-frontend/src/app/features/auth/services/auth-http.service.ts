import { inject, Injectable } from '@angular/core';
import { LoginPayload, Tokens, User } from '../interfaces/iauth';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  private _http = inject(HttpClient);

  /**
   * A http request that used to log in to the system.
   *
   * @param payload
   * @returns
   */
  public login$(payload: LoginPayload): Observable<Tokens> {
    return this._http.post<Tokens>('api/auth/login', payload);
  }

  /**
   * Returns current logged in user from the database.
   */
  public getUser$(): Observable<User> {
    return this._http.get<User>('api/auth/get-user');
  }

  /**
   * A http request that is used to log out the user.
   */
  public logout$(): Observable<void> {
    return this._http.get<void>('api/auth/logout');
  }

  /**
   * A http call that is used to authenticate the user.
   *
   * @returns
   */
  public refresh$(): Observable<void> {
    return this._http.get<void>('api/auth/refresh-token');
  }
}
