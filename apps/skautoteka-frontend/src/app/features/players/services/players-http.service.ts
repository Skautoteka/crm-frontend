import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../interfaces';
import { InputConfig } from '@skautoteka-frontend/ui';
import { IGenericDelete, IModelResponse } from '@skautoteka-frontend/common';

@Injectable({ providedIn: 'root' })
export class PlayersHttpService {
  constructor(private http: HttpClient) {}

  /**
   * Gets all players from the database.
   */
  public getAllPlayers$(): Observable<Player[]> {
    return this.http.get<Player[]>('api/player/all');
  }

  /**
   * Gets create fields for player model.
   */
  public getCreateFieldsConfig$(): Observable<InputConfig> {
    return this.http.get<InputConfig>('api/player/create-fields');
  }

  /**
   *
   * @param player
   */
  public addPlayer$(player: Player): Observable<IModelResponse<Player>> {
    return this.http.post<IModelResponse<Player>>('api/player', { ...player });
  }

  /**
   * Removes a player from the database.
   *
   * @param id
   */
  public deletePlayer$(id: string): Observable<IGenericDelete> {
    return this.http.delete<IGenericDelete>('api/player/' + id);
  }
}
