import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassBinder } from '@skautoteka-frontend/common';
import { LabelComponent, LabelContainerComponent, ListCardComponent } from '@skautoteka-frontend/ui';
import { TeamsStore } from '../../store/teams.store';

@Component({
  standalone: true,
  selector: 'skt-teams-players',
  styleUrl: './teams-players.component.scss',
  templateUrl: 'teams-players.component.html',
  providers: [ClassBinder],
  imports: [LabelComponent, LabelContainerComponent, ListCardComponent, CommonModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsPlayersComponent {
  public teamsStore = inject(TeamsStore);

  public teamPlayers = this.teamsStore.teamPlayers;

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-teams-player');
  }
}
