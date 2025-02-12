import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ButtonComponent, InputComponent, InputContainerComponent, InputViewService } from '@skautoteka-frontend/ui';
import { AsyncPipe } from '@angular/common';
import { Report } from '../../interfaces/report';
import { ReportsStore } from '../../store/reports.store';
import { TasksStore } from '../../../tasks/store/tasks.store';

@Component({
  standalone: true,
  selector: 'skt-tasks-create-full',
  styleUrl: './reports-create-full.component.scss',
  templateUrl: 'reports-create-full.component.html',
  providers: [ClassBinder, InputViewService],
  imports: [InputComponent, ButtonComponent, InputContainerComponent, AsyncPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsCreateFullComponent implements OnInit, OnDestroy {
  public reportsStore = inject(ReportsStore);
  public tasksStore = inject(TasksStore);

  constructor(classBinder: ClassBinder, public inputView: InputViewService<Report>) {
    classBinder.bind('skt-tasks-create-full');
  }

  ngOnInit() {
    this.reportsStore.fetchReportFields(this.reportsStore.selectedReport()?.id || '');
  }

  ngOnDestroy() {
    this.reportsStore.cleanReportFields();
  }

  public onSaveButtonClick(): void {
    this.reportsStore.updateReport({ ...this.inputView.value, id: this.reportsStore.selectedReport()?.id || '' });
  }
}
