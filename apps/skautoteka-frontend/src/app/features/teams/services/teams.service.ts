import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Team } from '../interfaces/team';
import { TeamsHttpService } from './teams-http.service';
import { InputConfig } from '@skautoteka-frontend/ui';

@Injectable({ providedIn: 'root' })
export class TeamsService {
  private _allTeams: Team[] = [];
  private _allTeams$ = new BehaviorSubject<Team[]>(this._allTeams);

  constructor(private _teamHttp: TeamsHttpService) {}

  get allTeams$(): Observable<Team[]> {
    return this._allTeams$;
  }

  /**
   * Retrieves all reports from backend.
   *
   * @returns
   */
  public fetchAllTeams(): void {
    this._teamHttp.getAllTeams$().subscribe(teams => this._setTeams(teams));
  }

  /**
   * Gets create fields for tasks model.
   */
  public getCreateFieldsConfig$(): Observable<InputConfig> {
    return this._teamHttp.getCreateFieldsConfig$();
  }

  /**
   * Adds a new team to the database.
   *
   * @param team
   */
  public addTeam(team: Team): void {
    this._teamHttp.addTeam$(team).subscribe(x => console.log(x));
  }

  private _setTeams(teams: Team[]): void {
    this._allTeams = teams;
    this._allTeams$.next(this._allTeams);
  }
}
