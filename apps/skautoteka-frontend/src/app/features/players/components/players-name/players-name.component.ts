import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { PlayersStore } from '../../store/players.store';

@Component({
  standalone: true,
  selector: 'skt-players-name',
  styleUrl: './players-name.component.scss',
  templateUrl: 'players-name.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersNameComponent {
  public playersStore = inject(PlayersStore);

  public playerPosition = computed(() => {
    const activePlayer = this.playersStore.activePlayer();

    if (!activePlayer) {
      return 'Brak informacji';
    }

    switch (activePlayer.position) {
      case 'DEFENSE':
        return 'Obrońca';
      case 'FORWARD':
        return 'Napastnik';
      case 'WINGER':
        return 'Skrzydłowy';
    }
  });

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-players-name');
  }
}
