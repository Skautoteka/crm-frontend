import { ChangeDetectionStrategy, Component, effect, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ActionsConfig,
  ContentService,
  SideContentComponent,
  SideContentheaderActionsComponent,
  SideContentHeaderComponent,
  SideContentSectionComponent,
  SideContentSectionHeaderActionComponent
} from '@skautoteka-frontend/ui';
import { ReportsBasicInfoComponent } from '../reports-basic-info/reports-basic-info.component';
import { ReportsTitleComponent } from '../reports-title/reports-title.component';
import { ReportsStore } from '../../store/reports.store';
import { Router } from '@angular/router';

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
    SideContentSectionComponent,
    ReportsBasicInfoComponent,
    SideContentHeaderComponent,
    SideContentheaderActionsComponent,
    ReportsTitleComponent,
    SideContentSectionHeaderActionComponent
  ]
})
export class ReportsSideContentComponent {
  public reportsStore = inject(ReportsStore);
  public actionsConfig: ActionsConfig[] = [
    {
      type: 'DELETE',
      text: 'Usuń raport',
      callback: () => this._deleteReport()
    }
  ];

  private _router = inject(Router);

  constructor(classBinder: ClassBinder, private _content: ContentService) {
    classBinder.bind('skt-reports-side-content');
    this._showSideContent();

    if (!this.reportsStore.activeReport()) {
      this._router.navigate(['/', 'dashboard', 'reports']);
    }
  }

  public onMobileBackClick(): void {
    this.reportsStore.setActiveReport(null);
  }

  private _showSideContent() {
    effect(() => {
      const activeReport = this.reportsStore.activeReport();
      if (activeReport) {
        this._content.showSideContent(!!activeReport);
      }
    });
  }

  private _deleteReport(): void {
    const activeReport = this.reportsStore.activeReport();

    if (!activeReport) {
      return;
    }

    this.reportsStore.removeReport(activeReport.id);
  }
}
