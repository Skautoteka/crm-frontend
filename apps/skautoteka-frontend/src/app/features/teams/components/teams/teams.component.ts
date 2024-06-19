import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  SideContentHeaderComponent,
  SideContentComponent,
  SideContentheaderActionsComponent,
  ButtonComponent,
  SideContentSectionComponent,
  SideContentSectionHeaderComponent,
  SideContentSectionEntityComponent,
  SideContentSectionRatingComponent,
  TableComponent,
  ContentComponent,
  ModalService
} from '@skautoteka-frontend/ui';
import { TasksContentComponent } from '../../../tasks/components/tasks-content/tasks-content.component';

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
    TableComponent,
    SideContentSectionEntityComponent,
    SideContentSectionRatingComponent,
    TasksContentComponent
  ]
})
export class TeamsComponent {
  // public actionsConfig: ActionsConfig[] = [{ type: 'DELETE', text: 'Usuń raport' }];

  constructor(classBinder: ClassBinder, private _modal: ModalService) {
    classBinder.bind('skt-teams');
  }

  public onAddNewClick(): void {
    // this._modal.createModal(ReportsCreateComponent, {
    //   header: 'Dodaj zadanie',
    //   subHeader: 'Wypełnij wszystkie wymagane informacje o zadaniu i zapisz zmiany'
    // });
  }
}
