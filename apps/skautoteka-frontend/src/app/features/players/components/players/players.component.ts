import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ButtonComponent, ContentComponent, ModalService } from '@skautoteka-frontend/ui';
import { PlayersContentComponent } from '../players-content/players-content.component';
import { PlayersCreateComponent } from '../players-create/players-create.component';
import { PlayersStore } from '../../store/players.store';

@Component({
  standalone: true,
  selector: 'skt-players',
  styleUrl: './players.component.scss',
  templateUrl: 'players.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContentComponent, ButtonComponent, PlayersContentComponent]
})
export class PlayersComponent {
  public players = inject(PlayersStore);

  constructor(classBinder: ClassBinder, private _modal: ModalService) {
    classBinder.bind('skt-players');
  }

  public onAddNewClick(): void {
    this._modal.createModal(PlayersCreateComponent, {
      header: 'Dodaj zawodnika',
      subHeader: 'Wypełnij wszystkie wymagane informacje aby dodać zawodnika'
    });
  }
}
