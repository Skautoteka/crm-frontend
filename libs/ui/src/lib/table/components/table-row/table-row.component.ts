import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation, input } from '@angular/core';
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
export class TableRowComponent implements AfterViewInit {
  public tableDef = input<TableDefinition>([]);

  constructor(classBinder: ClassBinder, private _elementRef: ElementRef, private _renderer: Renderer2) {
    classBinder.bind('skt-ui-table-row');
  }

  public ngAfterViewInit(): void {
      console.log(this._elementRef);
  }

  public setTableDef(definition: TableDefinition): void {
    const columnDef = definition.reduce((prev, curr) => prev + ' ' + curr.width, '');
    this._renderer.setStyle(this._elementRef.nativeElement, 'grid-template-columns', columnDef);
  }
}
