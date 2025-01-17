import { ChangeDetectionStrategy, Component, effect, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ActionsConfig,
  ContentService,
  SideContentComponent,
  SideContentheaderActionsComponent,
  SideContentHeaderComponent,
  SideContentSectionComponent,
  SideContentSectionHeaderComponent,
  SideContentSectionHeaderActionComponent,
  LabelContainerComponent,
  LabelComponent
} from '@skautoteka-frontend/ui';
import { TeamTitleComponent } from '../team-title/team-title.component';
import { TeamsBasicInfoComponent } from '../teams-basic-info/teams-basic-info.component';
import { TeamsPlayersComponent } from '../teams-players/teams-players.component';
import { TeamsStore } from '../../store/teams.store';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'skt-teams-side-content',
  styleUrl: './teams-side-content.component.scss',
  templateUrl: 'teams-side-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SideContentComponent,
    SideContentSectionHeaderComponent,
    SideContentSectionComponent,
    SideContentHeaderComponent,
    SideContentheaderActionsComponent,
    TeamTitleComponent,
    TeamsBasicInfoComponent,
    SideContentSectionHeaderActionComponent,
    TeamsPlayersComponent,
    LabelContainerComponent,
    LabelComponent,
    DatePipe
  ]
})
export class TeamsSideContentComponent {
  public teamsStore = inject(TeamsStore);

  public actionsConfig: ActionsConfig[] = [
    { type: 'DELETE', text: 'Usuń drużynę', callback: () => this._deleteTeam() }
  ];

  private _router = inject(Router);

  constructor(classBinder: ClassBinder, private _content: ContentService) {
    classBinder.bind('skt-teams-side-content');
    this._showSideContent();

    if (!this.teamsStore.activeTeam()) {
      this._router.navigate(['/', 'dashboard', 'teams']);
    }
  }

  public onMobileBackClick(): void {
    this.teamsStore.setActiveTeam(null);
  }

  private _showSideContent() {
    effect(
      () => {
        const activeTeam = this.teamsStore.activeTeam();
        this.teamsStore.getTeamPlayers(activeTeam?.id || '');
        this._content.showSideContent(!!activeTeam);
      },
      { allowSignalWrites: true }
    );
  }

  private _deleteTeam(): void {
    const activeTeam = this.teamsStore.activeTeam();

    if (!activeTeam) {
      return;
    }

    this.teamsStore.removeTeam(activeTeam.id);
  }
}
