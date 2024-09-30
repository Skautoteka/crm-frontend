import { ChangeDetectionStrategy, Component, effect, inject, ViewEncapsulation } from '@angular/core';
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
import { ReportsBasicInfoComponent } from '../reports-basic-info/reports-basic-info.component';
import { ReportsTitleComponent } from '../reports-title/reports-title.component';
import { ReportsRatingComponent } from '../reports-rating/reports-rating.component';
import { ReportsStore } from '../../store/reports.store';

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
    ReportsTitleComponent,
    ReportsRatingComponent
  ]
})
export class ReportsSideContentComponent {
  public reportsStore = inject(ReportsStore);
  public actionsConfig: ActionsConfig[] = [
    {
      type: 'DELETE',
      text: 'Usuń raport',
      callback: () => {
        console.log('');
      }
    }
  ];

  constructor(classBinder: ClassBinder, private _content: ContentService) {
    classBinder.bind('skt-reports-side-content');
    this._showSideContent();
  }

  public onMobileBackClick(): void {
    this.reportsStore.setActiveReport(null);
  }

  private _showSideContent() {
    effect(() => {
      const activeReport = this.reportsStore.activeReport();
      if(activeReport) {
        this._content.showSideContent(!!activeReport);
      }
    })
  }
}
