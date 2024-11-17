import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../interfaces/team';
import { InputConfig } from '@skautoteka-frontend/ui';
import { IGenericDelete, IModelResponse } from '@skautoteka-frontend/common';
import { Player } from '../../players/interfaces';

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
   * Retrieves all players based on team id from the database.
   *
   * @returns
   */
  public getTeamPlayers$(id: string): Observable<Player[]> {
    return this.http.get<Player[]>(`api/player/allByTeamId/${id}`);
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
  public addTeam$(team: Team): Observable<IModelResponse<Team>> {
    return this.http.post<IModelResponse<Team>>('api/team', { ...team });
  }

  /**
   * Removes a team from the database.
   *
   * @param id
   * @returns
   */
  public deleteTeam$(id: string): Observable<IGenericDelete> {
    return this.http.delete<IGenericDelete>('api/team/' + id);
  }
}
