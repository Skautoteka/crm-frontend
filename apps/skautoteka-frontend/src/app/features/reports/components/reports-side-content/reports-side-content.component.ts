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
    SideContentheaderActionsComponent
  ]
})
export class ReportsSideContentComponent {
  public actionsConfig: ActionsConfig[] = [{ type: 'DELETE', text: 'Usuń raport', callback: () => { console.log('') } }];

  constructor(classBinder: ClassBinder, private _content: ContentService, private _reports: ReportsService) {
    classBinder.bind('skt-reports-content');
    this._showSideContent();
  }

  public onMobileBackClick(): void {
    this._reports.setActiveReport(null);
  }

  private _showSideContent() {
    this._reports.activeReport$.pipe(takeUntilDestroyed()).subscribe(report => this._content.showSideContent(!!report));
  }

  selectedDate = new Date('2024-01-31');
  rating = 4.5;
  finished = true;
}
