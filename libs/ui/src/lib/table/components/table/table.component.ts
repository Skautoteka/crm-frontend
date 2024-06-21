import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AsyncPipe } from '@angular/common';
import { IconComponent } from '../../../icon';
import { TableDefinition, TableSource } from '../../interfaces/itable';

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
  imports: [AsyncPipe, IconComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  public tableSource = input<TableSource<unknown>>([]);
  public tableDef = input<TableDefinition>([]);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-table');
  }
}
