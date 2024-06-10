import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  SideContentHeaderComponent,
  SideContentComponent,
  SidenavMenuComponent,
  SideContentheaderActionsComponent,
  ButtonComponent,
  ActionsConfig,
  SideContentSectionComponent,
  SideContentSectionHeaderComponent,
  SideContentSectionEntityComponent,
} from '@skautoteka-frontend/ui';
import { ReportsService } from '../../services';
import { ReportsContentComponent } from '../reports-content/reports-content.component';
import { TableComponent } from '../../../../../../../../libs/ui/src/lib/table/index';

@Component({
  standalone: true,
  selector: 'skt-reports',
  styleUrl: './reports.component.scss',
  templateUrl: 'reports.component.html',
  providers: [ClassBinder, ReportsService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SidenavMenuComponent,
    SideContentHeaderComponent,
    SideContentheaderActionsComponent,
    SideContentComponent,
    SideContentSectionComponent,
    SideContentSectionHeaderComponent,
    ButtonComponent,
    TableComponent,
    ReportsContentComponent,
    SideContentSectionEntityComponent,
  ],
})
export class ReportsComponent {
  public actionsConfig: ActionsConfig[] = [
    { type: 'DELETE', text: 'Usuń raport' },
  ];

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-reports');
  }
}
