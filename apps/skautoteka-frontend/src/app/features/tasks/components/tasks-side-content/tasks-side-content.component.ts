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
import { TasksBasicInfoComponent } from '../tasks-basic-info/tasks-basic-info.component';
import { TasksReportsComponent } from '../tasks-reports/tasks-reports.component';
import { TasksTeamsComponent } from '../tasks-teams/tasks-teams.component';
import { TasksService } from '../../services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'skt-tasks-side-content',
  styleUrl: './tasks-side-content.component.scss',
  templateUrl: 'tasks-side-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SideContentComponent,
    SideContentSectionHeaderComponent,
    SideContentSectionComponent,
    TasksBasicInfoComponent,
    TasksReportsComponent,
    SideContentHeaderComponent,
    SideContentheaderActionsComponent,
    TasksTeamsComponent
  ]
})
export class TasksSideContentComponent {
  public actionsConfig: ActionsConfig[] = [{ type: 'DELETE', text: 'Usuń raport' }];

  constructor(classBinder: ClassBinder, private _content: ContentService, private _tasks: TasksService) {
    classBinder.bind('skt-tasks-content');
    this._showSideContent();
  }

  public onMobileBackClick(): void {
    this._tasks.setActiveTask(null);
  }

  private _showSideContent() {
    this._tasks.activeTask$.pipe(takeUntilDestroyed()).subscribe(task => this._content.showSideContent(!!task));
  }
}
