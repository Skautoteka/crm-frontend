import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ReportsStore } from '../../store/reports.store';

@Component({
  standalone: true,
  selector: 'skt-report-title',
  styleUrl: './reports-title.component.scss',
  templateUrl: 'reports-title.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsTitleComponent {
  public reportsStore = inject(ReportsStore);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-report-title');

    setTimeout(() => {
      console.log(this.reportsStore.activeReport())
    }, 500)
  }
}
