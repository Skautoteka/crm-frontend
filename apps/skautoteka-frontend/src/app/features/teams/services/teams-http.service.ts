import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../interfaces/team';

@Injectable({ providedIn: 'root' })
export class TeamsHttpService {
  constructor(private http: HttpClient) {}

    /**
   * Retrieves all reports from the database.
   *
   * @returns
   */
    public getAllTeams$(): Observable<Team[]> {
      return this.http.get<Team[]>('api/team/all');
    }
}
