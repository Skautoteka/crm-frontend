import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  LabelComponent,
  ListCardComponent,
  TabComponent,
  TabsComponent,
  TableComponent,
  TableRowCellComponent,
  TableSource,
  TableRowComponent
} from '@skautoteka-frontend/ui';
import { ReportsService } from '../../services';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Report } from '../../interfaces/report';

@Component({
  standalone: true,
  selector: 'skt-reports-content',
  styleUrl: './reports-content.component.scss',
  templateUrl: 'reports-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TabsComponent,
    TabComponent,
    ListCardComponent,
    LabelComponent,
    TableComponent,
    AsyncPipe,
    TableRowCellComponent,
    TableRowComponent
  ]
})
export class ReportsContentComponent {
  public tableDef = [
    { name: 'Zdjecie', width: '4rem', hidden: true },
    { name: 'Nazwa', width: 'auto%' },
    { name: 'Status', width: '20%' },
    { name: 'Ocena', width: '10%' },
    { name: 'Data utworzenia', width: '20%' }
  ];

  constructor(classBinder: ClassBinder, public _reports: ReportsService) {
    classBinder.bind('skt-reports-content');
    this._reports.fetchAllReports();
  }

  get tableSource$(): Observable<TableSource<Report>> {
    return this._reports.allReports$;
  }
}
