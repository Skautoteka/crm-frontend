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
import { UsersBasicInfoComponent } from '../users-basic-info/users-basic-info.component';
import { UsersTitleComponent } from '../users-title/users-title.component';
import { UsersRatingComponent } from '../users-rating/users-rating.component';
import { ReportsStore } from '../../store/reports.store';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'skt-users-side-content',
  styleUrl: './users-side-content.component.scss',
  templateUrl: 'users-side-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SideContentComponent,
    SideContentSectionHeaderComponent,
    SideContentSectionComponent,
    UsersBasicInfoComponent,
    SideContentHeaderComponent,
    SideContentheaderActionsComponent,
    UsersTitleComponent,
    UsersRatingComponent
  ]
})
export class UsersSideContentComponent {
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
    classBinder.bind('skt-users-side-content');
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
