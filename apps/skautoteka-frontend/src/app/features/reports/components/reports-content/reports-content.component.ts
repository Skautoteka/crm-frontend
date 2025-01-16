import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { TableComponent, TableRowCellComponent, TableRowComponent, TagComponent } from '@skautoteka-frontend/ui';
import { DatePipe } from '@angular/common';
import { StatusTextPipe } from '../../pipes';
import { ReportsStore } from '../../store/reports.store';

@Component({
  standalone: true,
  selector: 'skt-reports-content',
  styleUrl: './reports-content.component.scss',
  templateUrl: 'reports-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableComponent, TableRowCellComponent, TableRowComponent, TagComponent, DatePipe, StatusTextPipe]
})
export class ReportsContentComponent {
  public reportsStore = inject(ReportsStore);
  public tableDef = [
    { name: 'Zdjecie', width: '4rem', hidden: true },
    { name: 'Nazwa', width: 'auto' },
    { name: 'Status', width: '7.5rem' },
    { name: 'Data utworzenia', width: '40%' }
  ];

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-reports-content');
    this.reportsStore.getReports();
  }

  public onRowClicked(id: string): void {
    this.reportsStore.setActiveReport(id);
  }
}
