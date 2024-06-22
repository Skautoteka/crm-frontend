import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild, ViewEncapsulation, input } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AsyncPipe } from '@angular/common';
import { TableDefinition } from '../../interfaces/itable';

@Component({
  standalone: true,
  selector: 'skt-ui-table-row',
  styleUrl: './table-row.component.scss',
  templateUrl: 'table-row.component.html',
  providers: [ClassBinder],
  imports: [AsyncPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowComponent {
  @ViewChild('tableRow', { read: ElementRef }) tableRow!: ElementRef;
  @Output() rowClicked = new EventEmitter<void>();

  public tableDef = input<TableDefinition>([]);

  constructor(classBinder: ClassBinder, private _renderer: Renderer2) {
    classBinder.bind('skt-ui-table-row');
  }

  public setTableDef(definition: TableDefinition): void {
    const columnDef = definition.reduce((prev, curr) => prev + ' ' + curr.width, '');
    this._renderer.setStyle(this.tableRow.nativeElement, 'grid-template-columns', columnDef);
  }

  public onRowClick(): void {
    this.rowClicked.emit();
  }
}
