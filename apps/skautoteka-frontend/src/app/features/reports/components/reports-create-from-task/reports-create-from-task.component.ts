import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ButtonComponent, InputComponent, InputContainerComponent, InputViewService } from '@skautoteka-frontend/ui';
import { AsyncPipe } from '@angular/common';
import { Report } from '../../interfaces/report';
import { ReportsStore } from '../../store/reports.store';
import { TasksStore } from '../../../tasks/store/tasks.store';

@Component({
  standalone: true,
  selector: 'skt-reports-create-from-task',
  styleUrl: './reports-create-from-task.component.scss',
  templateUrl: 'reports-create-from-task.component.html',
  providers: [ClassBinder, InputViewService],
  imports: [InputComponent, ButtonComponent, InputContainerComponent, AsyncPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsCreateFromTaskComponent {
  public reportsStore = inject(ReportsStore);
  public tasksStore = inject(TasksStore);

  constructor(classBinder: ClassBinder, public inputView: InputViewService<Report>) {
    classBinder.bind('skt-reports-create-from-task');
    this.reportsStore.fetchFields();
  }

  public onSaveButtonClick(): void {
    const taskId = this.tasksStore.activeTask()?.id;
    this.reportsStore.addReport({ ...this.inputView.value, taskId });
    setTimeout(() => this.tasksStore.getAssignedReports(taskId || ''), 100); // TODO how to get assigned reports on addition od report
  }
}
