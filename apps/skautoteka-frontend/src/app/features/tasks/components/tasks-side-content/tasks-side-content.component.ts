import { ChangeDetectionStrategy, Component, effect, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ActionsConfig,
  ContentService,
  SideContentComponent,
  SideContentheaderActionsComponent,
  SideContentHeaderComponent,
  SideContentSectionComponent,
  SideContentSectionHeaderComponent,
  SideContentSectionHeaderActionComponent,
  ModalService
} from '@skautoteka-frontend/ui';
import { TasksBasicInfoComponent } from '../tasks-basic-info/tasks-basic-info.component';
import { TasksReportsComponent } from '../tasks-reports/tasks-reports.component';
import { TasksTeamsComponent } from '../tasks-teams/tasks-teams.component';
import { TasksStore } from '../../store/tasks.store';
import { Router } from '@angular/router';
import { ReportsCreateFromTaskComponent } from '../../../reports';

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
    SideContentSectionHeaderActionComponent
  ]
})
export class TasksSideContentComponent {
  public tasksStore = inject(TasksStore);
  public actionsConfig: ActionsConfig[] = [{ type: 'DELETE', text: 'Usuń raport', callback: () => this._deleteTask() }];

  private _router = inject(Router);
  private _modal = inject(ModalService);

  constructor(classBinder: ClassBinder, private _content: ContentService) {
    classBinder.bind('skt-tasks-side-content');
    this._showSideContent();

    if (!this.tasksStore.activeTask()) {
      this._router.navigate(['/', 'dashboard', 'tasks']);
    }
  }

  public onMobileBackClick(): void {
    this.tasksStore.setActiveTask(null);
  }

  private _showSideContent() {
    effect(
      () => {
        const activeTask = this.tasksStore.activeTask();
        this.tasksStore.getAssignedReports(activeTask?.id || '');
        this._content.showSideContent(!!activeTask);
      },
      { allowSignalWrites: true }
    );
  }

  private _deleteTask(): void {
    const activeTask = this.tasksStore.activeTask();

    if (!activeTask) {
      return;
    }

    this.tasksStore.removeTask(activeTask.id);
  }

  public onAddNewClick(): void {
    this._modal.createModal(ReportsCreateFromTaskComponent, {
      header: 'Dodaj raport',
      subHeader: 'Wypełnij wszystkie wymagane informacje aby dodać raport'
    });
  }

  public onNotesAddClick(): void {
    this._modal.createModal(ReportsCreateComponent, {
      header: 'Dodaj raport',
      subHeader: 'Wypełnij wszystkie wymagane informacje aby dodać raport'
    });
  }
}
