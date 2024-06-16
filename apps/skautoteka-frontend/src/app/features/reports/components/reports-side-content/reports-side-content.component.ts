import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ActionsConfig,
  ContentService,
  SideContentComponent,
  SideContentheaderActionsComponent,
  SideContentHeaderComponent,
  SideContentSectionComponent,
  SideContentSectionHeaderComponent,
  SideContentSectionEntityComponent,
  SideContentSectionRatingComponent,
} from '@skautoteka-frontend/ui';
import { ReportsBasicInfoComponent } from '../reports-basic-info/reports-basic-info.component';
import { ReportsService } from '../../services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'skt-reports-side-content',
  styleUrl: './reports-side-content.component.scss',
  templateUrl: 'reports-side-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SideContentComponent,
    SideContentSectionHeaderComponent,
    SideContentSectionComponent,
    ReportsBasicInfoComponent,
    SideContentHeaderComponent,
    SideContentheaderActionsComponent,
    SideContentSectionEntityComponent,
    SideContentSectionRatingComponent,
  ],
})
export class ReportsSideContentComponent {
  public actionsConfig: ActionsConfig[] = [
    { type: 'DELETE', text: 'Usuń raport' },
  ];

  constructor(
    classBinder: ClassBinder,
    private _content: ContentService,
    private _reports: ReportsService
  ) {
    classBinder.bind('skt-reports-content');
    this._showSideContent();
  }

  public onMobileBackClick(): void {
    this._reports.setActiveReport(null);
  }

  private _showSideContent() {
    this._reports.activeReport$
      .pipe(takeUntilDestroyed())
      .subscribe((report) => this._content.showSideContent(!!report));
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
