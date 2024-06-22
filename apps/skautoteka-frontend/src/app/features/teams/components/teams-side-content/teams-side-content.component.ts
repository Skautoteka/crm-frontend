import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
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
import { TeamsService } from '../../services/teams.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TeamTitleComponent } from '../team-title/team-title.component';
import { TeamsBasicInfoComponent } from '../teams-basic-info/teams-basic-info.component';

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
    TeamsBasicInfoComponent
  ]
})
export class TeamsSideContentComponent {
  public actionsConfig: ActionsConfig[] = [{ type: 'DELETE', text: 'Usuń drużynę' }];

  constructor(classBinder: ClassBinder, private _content: ContentService, private _teams: TeamsService) {
    classBinder.bind('skt-teams-side-content');
    this._showSideContent();
  }

  public onMobileBackClick(): void {}

  private _showSideContent() {
    this._teams.activeTeam$.pipe(takeUntilDestroyed()).subscribe(task => this._content.showSideContent(!!task));

  }
}
