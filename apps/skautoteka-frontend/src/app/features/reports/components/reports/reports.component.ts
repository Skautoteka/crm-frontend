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
  SideContentSectionRatingComponent,
} from '@skautoteka-frontend/ui';
import { ReportsBasicInfoComponent } from '../reports-basic-info/reports-basic-info.component';
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
    SideContentSectionRatingComponent,
    ReportsBasicInfoComponent,
  ],
})
export class ReportsComponent {
  public actionsConfig: ActionsConfig[] = [
    { type: 'DELETE', text: 'Usuń raport' },
  ];

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-reports');
  }

  selectedDate = new Date('2024-01-31');
  rating = 4.5;
  finished = true;

  ratingData = [
    {
      imgSrc: 'assets/images/rating1.png',
      name: 'Główkowanie',
      number: '90',
    },
    {
      imgSrc: 'assets/images/rating2.png',
      name: 'Szybkość',
      number: '24',
    },
    {
      imgSrc: 'assets/images/rating1.png',
      name: 'Przegląd pola',
      number: '84',
    },
  ];
}
