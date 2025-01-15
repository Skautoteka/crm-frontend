import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ButtonComponent,
  InputContainerComponent,
  InputViewService,
  TabComponent,
  TabsComponent
} from '@skautoteka-frontend/ui';
import { Report } from '../../interfaces/report';
import { ReportsStore } from '../../store/reports.store';
import { TasksStore } from '../../../tasks/store/tasks.store';
import { ReportsAssignFromExistingComponent } from '../reports-assign-from-existing/reports-assign-from-existing.component';

@Component({
  standalone: true,
  selector: 'skt-reports-create-from-task',
  styleUrl: './reports-create-from-task.component.scss',
  templateUrl: 'reports-create-from-task.component.html',
  providers: [ClassBinder, InputViewService],
  imports: [ButtonComponent, InputContainerComponent, TabsComponent, TabComponent, ReportsAssignFromExistingComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsCreateFromTaskComponent {
  public reportsStore = inject(ReportsStore);
  public tasksStore = inject(TasksStore);

  public tab = signal<string | null>('new');

  constructor(classBinder: ClassBinder, public inputView: InputViewService<Report>) {
    classBinder.bind('skt-reports-create-from-task');
    this.reportsStore.fetchFields();
  }

  public onSaveButtonClick(): void {
    const taskId = this.tasksStore.activeTask()?.id;
    this.reportsStore.addReport({ ...this.inputView.value, taskId });
  }

  public handleTabChange(tab: string | null): void {
    this.tab.set(tab);
  }
}
