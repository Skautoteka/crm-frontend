import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassBinder } from '@skautoteka-frontend/common';
import { LabelComponent, LabelContainerComponent, ListCardComponent } from '@skautoteka-frontend/ui';
import { TasksStore } from '../../store/tasks.store';

@Component({
  standalone: true,
  selector: 'skt-tasks-reports',
  styleUrl: './tasks-reports.component.scss',
  templateUrl: 'tasks-reports.component.html',
  providers: [ClassBinder],
  imports: [LabelComponent, LabelContainerComponent, ListCardComponent, CommonModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksReportsComponent {
  public tasksStore = inject(TasksStore);

  public assignedReports = this.tasksStore.assignedReports;

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-tasks-reports');
  }
}
