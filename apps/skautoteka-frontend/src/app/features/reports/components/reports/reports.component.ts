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
} from '@skautoteka-frontend/ui';
import { ReportsService } from '../../services';

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
