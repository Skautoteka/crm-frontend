import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Team } from '../interfaces/team';
import { TeamsHttpService } from './teams-http.service';
import { InputConfig } from '@skautoteka-frontend/ui';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TeamsService {
  private _allTeams: Team[] = [];
  private _allTeams$ = new BehaviorSubject<Team[]>(this._allTeams);
  private _activeTeam: Team | null = null;
  private _activeTeam$ = new BehaviorSubject<Team | null>(null);

  constructor(private _teamHttp: TeamsHttpService, private _router: Router) {}

  get allTeams$(): Observable<Team[]> {
    return this._allTeams$;
  }

  get activeTeam$(): Observable<Team | null> {
    return this._activeTeam$;
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
  public addTeam$(team: Team): Observable<Team> {
    return this._teamHttp.addTeam$(team).pipe(map(({ added }) => added), tap(team =>
      this._setTeams([...this._allTeams, team])
    ))
  }

  /**
   * Sets active team.
   *
   * @param id
   */
  public setActiveTeam(id: string | null): void {
    this._activeTeam = this._allTeams.find(team => team.id === id) || null;
    this._activeTeam$.next(this._activeTeam);
    if(this._activeTeam) {
      this._router.navigate(['dashboard', 'teams', 'details', this._activeTeam.id])
    } else {
      this._router.navigate(['dashboard', 'teams']);
    }
  }

  private _setTeams(teams: Team[]): void {
    this._allTeams = teams;
    this._allTeams$.next(this._allTeams);
  }
}
