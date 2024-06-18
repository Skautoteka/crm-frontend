import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  SideContentHeaderComponent,
  SideContentComponent,
  SideContentheaderActionsComponent,
  ButtonComponent,
  ActionsConfig,
  SideContentSectionComponent,
  SideContentSectionHeaderComponent,
  SideContentSectionEntityComponent,
  SideContentSectionRatingComponent,
  TableComponent,
  ContentComponent,
  ModalService
} from '@skautoteka-frontend/ui';
import { ReportsBasicInfoComponent } from '../reports-basic-info/reports-basic-info.component';
import { ReportsService } from '../../services';
import { ReportsContentComponent } from '../reports-content/reports-content.component';
import { ReportsCreateComponent } from '../reports-create/reports-create.component';

@Component({
  standalone: true,
  selector: 'skt-reports',
  styleUrl: './reports.component.scss',
  templateUrl: 'reports.component.html',
  providers: [ClassBinder, ReportsService],
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
    ReportsContentComponent,
    SideContentSectionEntityComponent,
    SideContentSectionRatingComponent,
    ReportsBasicInfoComponent
  ]
})
export class ReportsComponent {
  public actionsConfig: ActionsConfig[] = [{ type: 'DELETE', text: 'Usuń raport' }];

  constructor(classBinder: ClassBinder, private _modal: ModalService) {
    classBinder.bind('skt-reports');
  }

  public onAddNewClick(): void {
    this._modal.createModal(ReportsCreateComponent, {
      header: 'Dodaj zadanie',
      subHeader: 'Wypełnij wszystkie wymagane informacje o zadaniu i zapisz zmiany'
    });
  }
}
