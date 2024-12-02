import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ButtonComponent, InputComponent, InputContainerComponent, InputViewService } from '@skautoteka-frontend/ui';
import { AsyncPipe } from '@angular/common';
import { Report } from '../../interfaces/report';
import { ReportsStore } from '../../store/reports.store';

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
export class ReportsCreateFullComponent {
  public reportsStore = inject(ReportsStore);

  constructor(classBinder: ClassBinder, public inputView: InputViewService<Report>) {
    classBinder.bind('skt-tasks-create-full');
    this.reportsStore.fetchReportFields(this.reportsStore.selectedReport()?.id || '');
  }

  public onSaveButtonClick(): void {
    // this.reportsStore.addReport(this.inputView.value);
  }
}
