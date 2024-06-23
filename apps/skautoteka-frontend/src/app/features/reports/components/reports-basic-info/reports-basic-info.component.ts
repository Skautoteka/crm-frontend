import { ChangeDetectionStrategy, Component, ViewEncapsulation, Input } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AsyncPipe, DatePipe } from '@angular/common';
import {
  LabelComponent,
  LabelContainerComponent,
  ListCardComponent,
  TabComponent,
  TabsComponent,
  TagComponent
} from '@skautoteka-frontend/ui';
import { map, Observable } from 'rxjs';
import { Report } from '../../interfaces/report';
import { ReportsService } from '../../services';
import { StatusTextPipe } from '../../pipes';

@Component({
  standalone: true,
  selector: 'skt-reports-basic-info',
  styleUrl: './reports-basic-info.component.scss',
  templateUrl: 'reports-basic-info.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TabsComponent,
    TabComponent,
    ListCardComponent,
    LabelComponent,
    DatePipe,
    AsyncPipe,
    LabelContainerComponent,
    TagComponent,
    StatusTextPipe
  ]
})
export class ReportsBasicInfoComponent {
  constructor(classBinder: ClassBinder, private _report: ReportsService) {
    classBinder.bind('skt-reports-basic-info');
  }

  get createdDate$(): Observable<string> {
    return this._report.activeReport$.pipe(map(report => report?.createdAt || ''));
  }

  get status$(): Observable<string> {
    return this._report.activeReport$.pipe(map(report => report?.status || ''));
  }
}
