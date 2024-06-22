import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  SideContentHeaderComponent,
  SideContentComponent,
  SideContentheaderActionsComponent,
  ButtonComponent,
  SideContentSectionComponent,
  SideContentSectionHeaderComponent,
  ContentComponent,
  ModalService
} from '@skautoteka-frontend/ui';
import { TeamsContentComponent } from '../teams-content/teams-content.component';
import { TeamsCreateComponent } from '../teams-create/teams-create.component';

@Component({
  standalone: true,
  selector: 'skt-teams',
  styleUrl: './teams.component.scss',
  templateUrl: 'teams.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ContentComponent,
    SideContentHeaderComponent,
    SideContentheaderActionsComponent,
    SideContentComponent,
    SideContentSectionComponent,
    SideContentSectionHeaderComponent,
    ButtonComponent,
    TeamsContentComponent
  ]
})
export class TeamsComponent {
  // public actionsConfig: ActionsConfig[] = [{ type: 'DELETE', text: 'Usuń raport' }];

  constructor(classBinder: ClassBinder, private _modal: ModalService) {
    classBinder.bind('skt-teams');
  }

  public onAddNewClick(): void {
    this._modal.createModal(TeamsCreateComponent, {
      header: 'Dodaj drużynę',
      subHeader: 'Wypełnij wszystkie wymagane informacje aby dodać drużynę do systemu'
    });
  }
}
