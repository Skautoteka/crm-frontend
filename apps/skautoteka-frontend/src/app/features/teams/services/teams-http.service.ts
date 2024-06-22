import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../interfaces/team';
import { InputConfig } from '@skautoteka-frontend/ui';

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

  /**
   * Gets create fields for report model.
   */
  public getCreateFieldsConfig$(): Observable<InputConfig> {
    return this.http.get<InputConfig>('api/team/create-fields');
  }

  /**
   * Post http request that adds a new team.
   *
   * @param team
   */
  public addTeam$(team: Team): Observable<void> {
    return this.http.post<void>('api/team', { ...team });
  }
}