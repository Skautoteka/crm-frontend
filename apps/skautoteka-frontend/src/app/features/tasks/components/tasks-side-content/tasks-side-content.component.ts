import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { TasksService } from '../../services';
import {
  ActionsConfig,
  SideContentComponent,
  SideContentheaderActionsComponent,
  SideContentHeaderComponent,
  SideContentSectionComponent,
  SideContentSectionHeaderComponent,
} from '@skautoteka-frontend/ui';
import { TasksBasicInfoComponent } from '../tasks-basic-info/tasks-basic-info.component';
import { TasksReportsComponent } from '../tasks-reports/tasks-reports.component';
import { TasksTeamsComponent } from '../tasks-teams/tasks-teams.component';

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
    TasksTeamsComponent,
  ],
})
export class TasksSideContentComponent {
  public actionsConfig: ActionsConfig[] = [
    { type: 'DELETE', text: 'Usuń raport' },
  ];

  constructor(classBinder: ClassBinder, public tasksService: TasksService) {
    classBinder.bind('skt-tasks-content');
  }
}
