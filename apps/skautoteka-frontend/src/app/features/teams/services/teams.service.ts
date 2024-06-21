import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Team } from '../interfaces/team';
import { TeamsHttpService } from './teams-http.service';

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
    this._teamHttp.getAllTeams$().subscribe(teams => {
      console.log(teams);
    })
  }
}
