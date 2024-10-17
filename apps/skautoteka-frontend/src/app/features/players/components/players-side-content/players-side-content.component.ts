import { ChangeDetectionStrategy, Component, effect, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ActionsConfig,
  ContentService,
  SideContentComponent,
  SideContentheaderActionsComponent,
  SideContentHeaderComponent,
  SideContentSectionComponent,
  SideContentSectionHeaderComponent
} from '@skautoteka-frontend/ui';
import { PlayersStore } from '../../store/players.store';

@Component({
  standalone: true,
  selector: 'skt-players-side-content',
  styleUrl: './players-side-content.component.scss',
  templateUrl: 'players-side-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SideContentComponent,
    SideContentSectionHeaderComponent,
    SideContentSectionComponent,
    SideContentHeaderComponent,
    SideContentheaderActionsComponent
  ]
})
export class PlayersSideContentComponent {
  public playersStore = inject(PlayersStore);
  public actionsConfig: ActionsConfig[] = [
    { type: 'DELETE', text: 'Usuń zawodnika', callback: () => this._deletePlayer() }
  ];

  constructor(classBinder: ClassBinder, private _content: ContentService) {
    classBinder.bind('skt-tasks-side-content');
    this._showSideContent();
  }

  public onMobileBackClick(): void {
    this.playersStore.setActivePlayer(null);
  }

  private _showSideContent() {
    const activePlayer = this.playersStore.activePlayer();
    effect(() => {
      this._content.showSideContent(!!activePlayer);
    });
  }

  private _deletePlayer(): void {
    const activeTeam = this.playersStore.activePlayer();

    if (!activeTeam) {
      return;
    }

    this.playersStore.removePlayer(activeTeam.id);
  }
}
