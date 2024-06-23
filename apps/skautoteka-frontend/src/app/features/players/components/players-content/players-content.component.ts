import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { PlayersService } from '../../services';
import { TableComponent, TableRowComponent, TableRowCellComponent } from '@skautoteka-frontend/ui';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Player } from '../../interfaces';

@Component({
  standalone: true,
  selector: 'skt-players-content',
  styleUrl: './players-content.component.scss',
  templateUrl: 'players-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableComponent, TableRowComponent, TableRowCellComponent, AsyncPipe]
})
export class PlayersContentComponent {
  public tableDef = [
    { name: 'Zdjecie', width: '4rem', hidden: true },
    { name: 'Imię i nazwisko', width: 'auto' },
    { name: 'Wiek', width: '20%' },
    { name: 'Drużyna', width: '30%' }
  ];

  get tableSource$(): Observable<Player[]> {
    return this._players.allPlayers$;
  }

  constructor(classBinder: ClassBinder, private _players: PlayersService) {
    classBinder.bind('skt-players-content');
    this._players.fetchAllPlayers();
  }

  public onRowClicked(id: string): void {
    console.log(id);
  }
}
