import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { LabelComponent, LabelContainerComponent } from '@skautoteka-frontend/ui';
import { DatePipe } from '@angular/common';
import { PlayersStore } from '../../store/players.store';

@Component({
  standalone: true,
  selector: 'skt-players-basic-info',
  styleUrl: './players-basic-info.component.scss',
  templateUrl: 'players-basic-info.component.html',
  providers: [ClassBinder],
  imports: [LabelComponent, LabelContainerComponent, DatePipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersBasicInfoComponent {
  public playersStore = inject(PlayersStore);

  public activePlayer = this.playersStore.activePlayer;

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-tasks-basic-info');
  }
}
