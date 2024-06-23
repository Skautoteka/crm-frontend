import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  standalone: true,
  selector: 'skt-ui-table-row-cell',
  styleUrl: './table-row-cell.component.scss',
  templateUrl: 'table-row-cell.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowCellComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-table-row-cell');
  }
}
