import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  TableComponent,
  TableRowComponent,
  TableRowCellComponent,
  InfinitePipe,
  LoaderComponent
} from '@skautoteka-frontend/ui';
import { PlayersStore } from '../../store/players.store';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'skt-players-content',
  styleUrl: './players-content.component.scss',
  templateUrl: 'players-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableComponent, TableRowComponent, TableRowCellComponent, InfinitePipe, NgFor, LoaderComponent, AsyncPipe]
})
export class PlayersContentComponent {
  public playersStore = inject(PlayersStore);

  public tableDef = [
    { name: 'Zdjecie', width: '4rem', hidden: true },
    { name: 'Imię i nazwisko', width: 'auto' },
    { name: 'Wiek', width: '20%' },
    { name: 'Drużyna', width: '30%' }
  ];

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-players-content');
    this.playersStore.getPlayers();
  }

  public onRowClicked(id: string): void {
    this.playersStore.setActivePlayer(id);
  }
}
