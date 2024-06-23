import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  LabelComponent,
  ListCardComponent,
  TabComponent,
  TabsComponent,
  TableComponent
} from '@skautoteka-frontend/ui';
import { ReportsService } from '../../services';

@Component({
  standalone: true,
  selector: 'skt-reports-content',
  styleUrl: './reports-content.component.scss',
  templateUrl: 'reports-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TabsComponent, TabComponent, ListCardComponent, LabelComponent, TableComponent]
})
export class ReportsContentComponent {
  public tableDef = [
    { name: 'Zdjecie', width: '20%', hidden: true },
    { name: 'Nazwa', width: '10%' },
    { name: 'Liga', width: '20%' },
    { name: 'Kraj', width: '30%' },
    { name: 'Miasto', width: '20%' }
  ];

  constructor(classBinder: ClassBinder, public reportsService: ReportsService) {
    classBinder.bind('skt-reports-content');
  }
}
