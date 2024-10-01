import { inject, Injectable } from "@angular/core";
import { LoginPayload, Tokens } from "../interfaces/iauth";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

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
   * A http request that is used to log out the user.
   */
  public logout$(): any {}
}
