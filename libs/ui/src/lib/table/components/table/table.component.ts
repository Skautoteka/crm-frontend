import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  DestroyRef,
  ElementRef,
  inject,
  input,
  QueryList,
  Renderer2,
  signal,
  viewChild,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { TableDefinition } from '../../interfaces/itable';
import { TableRowComponent } from '../table-row/table-row.component';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconComponent } from '../../../icon';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'skt-ui-table',
  styleUrl: './table.component.scss',
  templateUrl: 'table.component.html',
  providers: [ClassBinder],
  imports: [IconComponent, FormsModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements AfterViewChecked, AfterViewInit {
  @ViewChild('tableHeader', { read: ElementRef }) tableHeader!: ElementRef;
  @ContentChildren(TableRowComponent) tableRows!: QueryList<TableRowComponent>;
  public tableDef = input<TableDefinition>([]);

  public destroyRef = inject(DestroyRef);
  public scrolledDown$ = new BehaviorSubject<boolean>(true);

  public search = signal('');

  private _tableBody = viewChild.required<ElementRef>('tableBody');

  constructor(classBinder: ClassBinder, private _renderer: Renderer2) {
    classBinder.bind('skt-ui-table');
  }

  ngAfterViewChecked(): void {
    const columnDef = this.tableDef().reduce((prev, curr) => prev + ' ' + curr.width, '');
    this._renderer.setStyle(this.tableHeader.nativeElement, 'grid-template-columns', columnDef);
    this._setRowsTableDefinition();
  }

  ngAfterViewInit(): void {
    const tableBody = this._tableBody();
    const element = tableBody.nativeElement;

    fromEvent(element, 'scroll')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (element.scrollTop + element.clientHeight + 50 >= element.scrollHeight) {
          this.scrolledDown$.next(true);
        } else {
          this.scrolledDown$.next(false);
        }
      });
  }

  public onClearClick(): void {
    this.search.set('');
  }

  private _setRowsTableDefinition(): void {
    this.tableRows.forEach(row => row.setTableDef(this.tableDef()));
  }
}
