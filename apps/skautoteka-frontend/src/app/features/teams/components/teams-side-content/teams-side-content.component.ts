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
    SideContentheaderActionsComponent
  ]
})
export class TeamsSideContentComponent {
  public actionsConfig: ActionsConfig[] = [{ type: 'DELETE', text: 'Usuń drużynę' }];

  constructor(classBinder: ClassBinder, private _content: ContentService) {
    classBinder.bind('skt-teams-side-content');
    this._showSideContent();
  }

  public onMobileBackClick(): void {}

  private _showSideContent() {}
}
