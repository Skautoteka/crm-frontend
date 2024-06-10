import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Host,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ClassBinder } from '@skautoteka-frontend/common';
import { TableService } from '../../services/table.service';
import { AsyncPipe } from '@angular/common';
import { IconComponent } from '../../../icon';

export interface TableColumn {
  key: string;
  label: string;
  type: 'string' | 'number' | 'date' | 'boolean' | 'img';
}

@Component({
  standalone: true,
  selector: 'skt-ui-table',
  styleUrl: './table.component.scss',
  templateUrl: 'table.component.html',
  providers: [ClassBinder],
  imports: [AsyncPipe, CommonModule, DatePipe, IconComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  constructor(
    // @Host() private tableService: TableService,
    private elementRef: ElementRef,
    classBinder: ClassBinder
  ) {
    classBinder.bind('skt-ui-table');
  }

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
