import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ComponentType } from '@angular/cdk/overlay';
import { IModalOptions } from '../../interface/imodal';

@Component({
  standalone: true,
  selector: 'skt-ui-modal-container',
  styleUrl: './modal-container.component.scss',
  templateUrl: 'modal-container.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalContainerComponent<T> implements AfterViewInit {
  @ViewChild('mountPoint', { read: ViewContainerRef })
  viewRef!: ViewContainerRef;

  @Input() componentType!: ComponentType<T>;
  @Input() options: IModalOptions | null = null;

  @Output() closeClick = new EventEmitter<void>();

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-modal-container');
  }

  ngAfterViewInit(): void {
    this.viewRef.createComponent(this.componentType).changeDetectorRef.detectChanges();
  }

  public onCloseClick(): void {
    this.closeClick.emit();
    this.viewRef.clear();
  }
}
