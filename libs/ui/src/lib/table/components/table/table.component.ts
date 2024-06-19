import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AsyncPipe } from '@angular/common';
import { IconComponent } from '../../../icon';

export interface TableColumn {
  key: string;
  label: string;
  type: 'string' | 'player' | 'number' | 'date' | 'boolean' | 'img';
}

@Component({
  standalone: true,
  selector: 'skt-ui-table',
  styleUrl: './table.component.scss',
  templateUrl: 'table.component.html',
  providers: [ClassBinder],
  imports: [AsyncPipe, DatePipe, IconComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input() onActionClick: any;
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-table');
  }
}
