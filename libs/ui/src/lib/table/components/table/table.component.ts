import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  input,
  QueryList,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AsyncPipe } from '@angular/common';
import { IconComponent } from '../../../icon';
import { TableDefinition } from '../../interfaces/itable';
import { TableRowComponent } from '../table-row/table-row.component';

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
export class TableComponent implements AfterViewChecked {
  @ViewChild('tableHeader', { read: ElementRef }) tableHeader!: ElementRef;
  @ContentChildren(TableRowComponent) tableRows!: QueryList<TableRowComponent>;
  public tableDef = input<TableDefinition>([]);

  constructor(classBinder: ClassBinder, private _renderer: Renderer2) {
    classBinder.bind('skt-ui-table');
  }

  ngAfterViewChecked(): void {
    const columnDef = this.tableDef().reduce((prev, curr) => prev + ' ' + curr.width, '');
    this._renderer.setStyle(this.tableHeader.nativeElement, 'grid-template-columns', columnDef);

    this._setRowsTableDefinition();
  }

  private _setRowsTableDefinition(): void {
    this.tableRows.forEach(row => row.setTableDef(this.tableDef()));
  }
}
