import { Injectable } from '@angular/core';
import { PlayersHttpService } from './players-http.service';
import { Router } from '@angular/router';
import { Player } from '../interfaces';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { InputConfig } from '@skautoteka-frontend/ui';

@Injectable({ providedIn: 'root' })
export class PlayersService {
  private _allPlayers: Player[] = [];
  private _allPlayers$ = new BehaviorSubject<Player[]>(this._allPlayers);
  private _activePlayer: Player | null = null;
  private _activePlayer$ = new BehaviorSubject<Player | null>(null);

  constructor(private _playersHttp: PlayersHttpService, private _router: Router) {}

  get allPlayers$(): Observable<Player[]> {
    return this._allPlayers$;
  }

  get activePlayer$(): Observable<Player | null> {
    return this._activePlayer$;
  }

  /**
   * Gets create fields for players model.
   */
  public getCreateFieldsConfig$(): Observable<InputConfig> {
    return this._playersHttp.getCreateFieldsConfig$();
  }

  /**
   * Retrieves all players from the backend.
   */
  public fetchAllPlayers(): void {
    this._playersHttp.getAllPlayers$().subscribe(players => this._setPlayers(players));
  }

  /**
   * Adds a new player to the database.
   *
   * @param player
   */
  public addPlayer$(player: Player): Observable<Player> {
    return this._playersHttp.addPlayer$(player).pipe(
      map(({ added }) => added),
      tap(player => this._setPlayers([...this._allPlayers, player]))
    );
  }

  /**
   * Removes a player from the database.
   *
   * @param id
   */
  public deletePlayer(id: string): void {
    this._playersHttp.deletePlayer$(id).subscribe(() => this._deleteTeam(id));
  }

  /**
   * Sets active player.
   *
   * @param id
   */
  public setActivePlayer(id: string | null): void {
    this._activePlayer = this._allPlayers.find(player => player.id === id) || null;
    this._activePlayer$.next(this._activePlayer);
    if (this._activePlayer) {
      this._router.navigate(['dashboard', 'player', 'details', this._activePlayer.id]);
    } else {
      this._router.navigate(['dashboard', 'player']);
    }
  }

  private _setPlayers(players: Player[]) {
    this._allPlayers = players;
    this._allPlayers$.next(this._allPlayers);
  }

  private _deleteTeam(id: string): void {
    this._allPlayers = this._allPlayers.filter(player => player.id !== id);
    this._allPlayers$.next(this._allPlayers);
    this.setActivePlayer(null);
  }
}
