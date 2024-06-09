import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  standalone: true,
  selector: 'skt-ui-dialog',
  styleUrl: './dialog.component.scss',
  templateUrl: 'dialog.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  @ViewChild('mountPoint', { read: ViewContainerRef })
  viewRef!: ViewContainerRef;

  @Output() closeClick = new EventEmitter<void>();

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-dialog');
  }
}
