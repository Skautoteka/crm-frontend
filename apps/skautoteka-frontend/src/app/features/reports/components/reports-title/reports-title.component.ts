import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AsyncPipe } from '@angular/common';
import { ReportsService } from '../../services';
import { map, Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'skt-report-title',
  styleUrl: './reports-title.component.scss',
  templateUrl: 'reports-title.component.html',
  providers: [ClassBinder],
  imports: [AsyncPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsTitleComponent {
  constructor(classBinder: ClassBinder, private _report: ReportsService) {
    classBinder.bind('skt-report-title');
  }

  get reportName$(): Observable<string> {
    return this._report.activeReport$.pipe(map(report => report?.name || ''));
  }

  get reportPosition$(): Observable<string> {
    return this._report.activeReport$.pipe(map(report => report?.id || ''));
  }
}
