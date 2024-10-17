import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { PlayersStore } from '../../store/players.store';

@Component({
  standalone: true,
  selector: 'skt-players-name',
  styleUrl: './players-name.component.scss',
  templateUrl: 'players-name.component.html',
  providers: [ClassBinder],
  imports: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersNameComponent {
  public playersStore = inject(PlayersStore);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-players-name');
  }
}
